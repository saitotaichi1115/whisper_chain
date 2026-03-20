'use server'

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
//部屋の入退出、ゲームの開始を管理する
export async function joinRandomMatch() {
    // Fetch all waiting rooms and ready rooms
    const waitingRooms = await redis.smembers("waiting_rooms");
    const readyRooms = await redis.smembers("ready_rooms");

    let roomId: null | string = null;

    // 1. Try to join a "ready" room first
    if (readyRooms && readyRooms.length > 0) {
        roomId = readyRooms[Math.floor(Math.random() * readyRooms.length)];
    }
    // 2. Otherwise try to join a "waiting" room
    else if (waitingRooms && waitingRooms.length > 0) {
        roomId = waitingRooms[Math.floor(Math.random() * waitingRooms.length)];
    }

    // 3. If no suitable room was found, create a new one
    if (!roomId) {
        roomId = crypto.randomUUID().slice(0, 8);
        type GameStatus = "waiting" | "ready" | "playing" | "result";
        const status: GameStatus = "waiting";
        await redis.hset(`room:${roomId}`, { status });
        await redis.sadd("waiting_rooms", roomId);
    }

    // Redirect to the room lobby
    redirect(`/random-match/${roomId}`);
}

export async function processPlayerEntry(roomId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    const playerId = session.user.id;
    const MAX_PLAYERS = 6;
    const MIN_PLAYERS = parseInt(process.env.MIN_PLAYERS || "4");

    // Check if room exists
    const roomState = await redis.hgetall(`room:${roomId}`);
    if (!roomState || Object.keys(roomState).length === 0) {
        return null;
    }

    // Add player to the room's set of players
    const isMember = await redis.sismember(`room:${roomId}:players`, playerId);
    if (!isMember) {
        await redis.sadd(`room:${roomId}:players`, playerId);
    }

    const players = await redis.smembers(`room:${roomId}:players`);
    const playerCount = players.length;

    if (playerCount >= MAX_PLAYERS) {
        // Room is full, move to playing
        await redis.hset(`room:${roomId}`, { status: "playing" });
        await redis.srem("ready_rooms", roomId);
        await redis.srem("waiting_rooms", roomId);
    } else if (playerCount >= MIN_PLAYERS) {
        // Room is ready to start (4-5 players)
        await redis.hset(`room:${roomId}`, { status: "ready" });
        await redis.sadd("ready_rooms", roomId);
        await redis.srem("waiting_rooms", roomId);
    } else {
        // Still waiting (1-3 players)
        await redis.hset(`room:${roomId}`, { status: "waiting" });
        await redis.sadd("waiting_rooms", roomId);
        await redis.srem("ready_rooms", roomId);
    }

    return {
        playerId,
        roomState: {
            ...roomState,
            status: playerCount >= MAX_PLAYERS ? "playing" : playerCount >= MIN_PLAYERS ? "ready" : "waiting",
            players: playerCount
        }
    };
}

export async function getRoomStatus(roomId: string) {
    const roomState = await redis.hgetall(`room:${roomId}`);
    if (!roomState || Object.keys(roomState).length === 0) {
        return null;
    }

    // Get the actual player count from the set
    const players = await redis.smembers(`room:${roomId}:players`);
    return {
        ...roomState,
        players: players.length
    };
}

export async function leaveRoom(roomId: string, playerId: string) {
    await redis.srem(`room:${roomId}:players`, playerId);
    const players = await redis.smembers(`room:${roomId}:players`);
    const playerCount = players.length;

    if (playerCount === 0) {
        // Option A: Clean up empty room
        await redis.del(`room:${roomId}`);
        await redis.del(`room:${roomId}:players`);
        await redis.srem("waiting_rooms", roomId);
        await redis.srem("ready_rooms", roomId);
    } else {
        // Option B: Downgrade status if necessary
        const MIN_PLAYERS = parseInt(process.env.MIN_PLAYERS || "4");
        if (playerCount < MIN_PLAYERS) {
            await redis.hset(`room:${roomId}`, { status: "waiting" });
            await redis.srem("ready_rooms", roomId);
            await redis.sadd("waiting_rooms", roomId);
        }
    }
}
export async function startGame(roomId: string) {
    await redis.hset(`room:${roomId}`, { status: "playing" });
    await redis.srem("ready_rooms", roomId);
    await redis.srem("waiting_rooms", roomId);
}

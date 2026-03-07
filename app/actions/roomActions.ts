'use server'

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

export async function joinRandomMatch() {
    // Fetch all waiting rooms
    const waitingRooms = await redis.smembers("waiting_rooms");

    let roomId = null;

    if (waitingRooms && waitingRooms.length > 0) {
        // Pick a random room from the waiting list
        const randomRoomId = waitingRooms[Math.floor(Math.random() * waitingRooms.length)];

        // Get the current state of the room
        const roomState = await redis.hgetall(`room:${randomRoomId}`);

        // Define max players per room (e.g., 4)
        const MAX_PLAYERS = 4;

        if (roomState && roomState.status === "waiting" && Number(roomState.players) < MAX_PLAYERS) {
            // Join this room
            roomId = randomRoomId;
            const newPlayersCount = Number(roomState.players) + 1;

            // Update the player count
            await redis.hset(`room:${roomId}`, { players: newPlayersCount });

            // If the room is now full, remove it from the waiting list and update status
            if (newPlayersCount >= MAX_PLAYERS) {
                await redis.srem("waiting_rooms", roomId);
                await redis.hset(`room:${roomId}`, { status: "ready" });
            }
        } else if (roomState && (Number(roomState.players) >= MAX_PLAYERS || roomState.status !== "waiting")) {
            // Clean up if the room is somehow still in waiting_rooms but is full/not waiting
            await redis.srem("waiting_rooms", randomRoomId);
        }
    }

    // If no suitable room was found, create a new one
    if (!roomId) {
        roomId = crypto.randomUUID().slice(0, 8); // generate short id for the lobby
        await redis.hset(`room:${roomId}`, { status: "waiting", players: 1 });
        await redis.sadd("waiting_rooms", roomId);
    }

    // Redirect to the room lobby
    redirect(`/random-match/${roomId}`);
}

export async function getRoomStatus(roomId: string) {
    const roomState = await redis.hgetall(`room:${roomId}`);
    if (!roomState || Object.keys(roomState).length === 0) {
        return null;
    }
    return roomState;
}

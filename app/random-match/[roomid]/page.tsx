import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { RoomContainer } from "./RoomContainer";

interface PageProps {
    params: Promise<{ roomid: string }>;
}

export default async function RandomMatchLobby({ params }: PageProps) {
    const resolvedParams = await params;
    const roomId = resolvedParams.roomid;

    // Fetch initial room state
    const roomState = await redis.hgetall(`room:${roomId}`);

    // If room does not exist or status is missing, redirect back to start
    if (!roomState || !roomState.status) {
        redirect('/start-game');
    }

    const players = await redis.smembers(`room:${roomId}:players`);
    const playersCount = players.length;
    const MAX_PLAYERS = 6;
    const initialStatus = roomState.status as string;
    const MIN_PLAYERS = parseInt(process.env.MIN_PLAYERS || "4");

    return (
        <RoomContainer
            roomId={roomId}
            initialPlayers={playersCount}
            maxPlayers={MAX_PLAYERS}
            minPlayers={MIN_PLAYERS}
            initialStatus={initialStatus}
        />
    );
}

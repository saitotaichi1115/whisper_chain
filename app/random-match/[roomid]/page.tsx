import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { LobbyClient } from "./LobbyClient";

interface PageProps {
    params: Promise<{ roomid: string }>;
}

export default async function RandomMatchLobby({ params }: PageProps) {
    const resolvedParams = await params;
    const roomId = resolvedParams.roomid;

    // Fetch initial room state
    const roomState = await redis.hgetall(`room:${roomId}`);

    // If room does not exist, redirect back to start
    if (!roomState || !roomState.status) {
        redirect('/start-game');
    }

    const playersCount = Number(roomState.players) || 1;
    const MAX_PLAYERS = 4;

    return (
        <LobbyClient
            roomId={roomId}
            initialPlayers={playersCount}
            maxPlayers={MAX_PLAYERS}
        />
    );
}

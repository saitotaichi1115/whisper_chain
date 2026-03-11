'use client';

import { useState, useEffect } from "react";
import { LobbyClient } from "./LobbyClient";
import { GameClient } from "./GameClient";
import { getRoomStatus } from "@/app/actions/roomActions";

interface RoomContainerProps {
    roomId: string;
    initialPlayers: number;
    maxPlayers: number;
    minPlayers: number;
    initialStatus: string;
}

export function RoomContainer({ roomId, initialPlayers, maxPlayers, minPlayers, initialStatus }: RoomContainerProps) {
    const [roomStatus, setRoomStatus] = useState(initialStatus);
    const [players, setPlayers] = useState(initialPlayers);

    useEffect(() => {
        // Only pool if we're not already in playing state
        if (roomStatus === 'playing') return;

        const interval = setInterval(async () => {
            const data = (await getRoomStatus(roomId)) as { players: number; status: string } | null;
            if (data) {
                setPlayers(Number(data.players));
                setRoomStatus(String(data.status));
            }
        }, parseInt(process.env.NEXT_PUBLIC_WAIT_TIME || "30") * 100);

        return () => clearInterval(interval);
    }, [roomId, roomStatus]);

    if (roomStatus === 'playing') {
        return <GameClient roomId={roomId} />;
    }

    return (
        <LobbyClient
            roomId={roomId}
            initialPlayers={players}
            maxPlayers={maxPlayers}
            minPlayers={minPlayers}
            initialStatus={roomStatus}
        />
    );
}

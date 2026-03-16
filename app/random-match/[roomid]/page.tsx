import { redirect } from "next/navigation";
import { RoomContainer } from "./RoomContainer";
import { processPlayerEntry } from "@/app/actions/roomActions";

interface PageProps {
    params: Promise<{ roomid: string }>;
}

export default async function RandomMatchLobby({ params }: PageProps) {
    const resolvedParams = await params;
    const roomId = resolvedParams.roomid;

    // Process player entry and get the updated room state
    const entryResult = await processPlayerEntry(roomId);
    
    // If room does not exist or status is missing, redirect back to start
    if (!entryResult || !entryResult.roomState.status) {
        redirect('/start-game');
    }

    const MAX_PLAYERS = 6;
    const MIN_PLAYERS = parseInt(process.env.MIN_PLAYERS || "4");
    
    const playersCount = entryResult.roomState.players;
    const initialStatus = entryResult.roomState.status as string;

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

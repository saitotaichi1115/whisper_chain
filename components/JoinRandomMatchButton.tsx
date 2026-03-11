'use client'

import { useTransition } from 'react';
import { joinRandomMatch } from '@/app/actions/roomActions';

export function JoinRandomMatchButton() {
    const [isPending, startTransition] = useTransition();

    const handleJoin = () => {
        let playerId = localStorage.getItem('whisper_chain_player_id');
        if (!playerId) {
            // Fallback for non-secure contexts (e.g. non-localhost/non-HTTPS)
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                playerId = crypto.randomUUID();
            } else {
                playerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
            localStorage.setItem('whisper_chain_player_id', playerId);
        }
        startTransition(() => joinRandomMatch(playerId));
    }

    return (
        <button
            onClick={handleJoin}
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-[0_4px_14px_0_rgba(127,19,236,0.39)] hover:shadow-[0_6px_20px_rgba(127,19,236,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
            <span>{isPending ? 'Joining...' : 'Join Random Match'}</span>
            <span className="material-symbols-outlined">
                {isPending ? 'hourglass_empty' : 'bolt'}
            </span>
        </button>
    );
}

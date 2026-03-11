export type Player = 0 | 1 | 2; // 0: empty, 1: player (X), 2: AI (O)

export function getBestMove(
    field: Player[],
    difficultyLevel: boolean = false,
    isAiSecond: boolean = true,
    count: number
): number | null {
    function random(): number {
        const availableIndices: number[] = [];
        for (let i = 0; i < field.length; i++) {
            if (field[i] === 0) {
                availableIndices.push(i);
            }
        }
        if (availableIndices.length === 0) return -1;
        return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }

    function reachJudge(a: Player[], playerNumber: Player): number[] {
        const row1 = a.slice(0, 3);
        const row2 = a.slice(3, 6);
        const row3 = a.slice(6, 9);
        const col1 = [a[0], a[3], a[6]];
        const col2 = [a[1], a[4], a[7]];
        const col3 = [a[2], a[5], a[8]];
        const dia1 = [a[0], a[4], a[8]];
        const dia2 = [a[2], a[4], a[6]];
        const rows = [row1, row2, row3, col1, col2, col3, dia1, dia2];

        const reachAvailability = rows.some(
            (row) => row.includes(0) && row.filter((x) => x === playerNumber).length === 2
        );

        if (!reachAvailability) return [null as any];

        const winningMoves: number[] = [];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].includes(0) && rows[i].filter((x) => x === playerNumber).length === 2) {
                const emptyIndex = rows[i].indexOf(0);
                let boardIndex: number = -1;
                switch (i) {
                    case 0: boardIndex = emptyIndex; break;
                    case 1: boardIndex = emptyIndex + 3; break;
                    case 2: boardIndex = emptyIndex + 6; break;
                    case 3: boardIndex = emptyIndex * 3; break;
                    case 4: boardIndex = (emptyIndex * 3) + 1; break;
                    case 5: boardIndex = (emptyIndex * 3) + 2; break;
                    case 6:
                        if (emptyIndex === 0) boardIndex = 0;
                        else if (emptyIndex === 1) boardIndex = 4;
                        else if (emptyIndex === 2) boardIndex = 8;
                        break;
                    case 7:
                        if (emptyIndex === 0) boardIndex = 2;
                        else if (emptyIndex === 1) boardIndex = 4;
                        else if (emptyIndex === 2) boardIndex = 6;
                        break;
                }
                winningMoves.push(boardIndex);
            }
        }
        return winningMoves;
    }

    function normalSelecting(a: (() => number | null) | null = null): number {
        const aiWinningMoves = reachJudge(field, 2);
        if (aiWinningMoves[0] !== null) {
            return aiWinningMoves[0];
        }
        const playerWinningMoves = reachJudge(field, 1);
        if (playerWinningMoves[0] !== null) {
            return playerWinningMoves[0];
        }

        if (a !== null) {
            const bestMove = a();
            if (bestMove !== null) return bestMove;
        }
        return random();
    }

    function hardSelecting(): number | null {
        if (isAiSecond) {
            if (field[4] === 0 && count === 1) return 4;
            if (field[4] === 1 && count === 1) return 0;
            if (count === 3 && ((field[0] === 1 && field[8] === 1) || (field[2] === 1 && field[6] === 1))) return 1;
            if (count === 3 && field.join(',') === [2, 0, 0, 0, 1, 0, 0, 0, 1].join(',')) return 2;
            if (count === 3) {
                if (field[0] === 1) return 8;
                if (field[2] === 1) return 6;
                if (field[6] === 1) return 2;
                if (field[8] === 1) return 0;
            }
        } else {
            if (count === 0) return 6;
            if (count === 2) {
                if (field[4] === 1) return 2;
                if (field[0] === 1 || field[8] === 1) return 2;
                if (field[2] === 1) return 8;
                return 4;
            }
            if (count === 4) {
                if (field[3] === 1) return 8;
                if (field[7] === 1) return 0;
                if (field[2] === 1) return 0;
            }
        }
        return null;
    }

    if (!difficultyLevel) {
        return normalSelecting();
    } else {
        return normalSelecting(hardSelecting);
    }
}

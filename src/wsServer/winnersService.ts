import { RoomUser, Winner } from './types';


const winners: Winner[] = [];
export const getWinners = (): Winner[] => winners;
export const getWinner = (winnerId): Winner => {
    return winners.find(({ id }): boolean => (id === winnerId));
};

export const addWin = (user: RoomUser) => {
    const foundWinner: Winner = winners.find(({ name: winnerName }): boolean => (winnerName === user.name));
    if (foundWinner) {
        foundWinner.wins++;

        return;
    }

    winners.push({ name: user.name, id: user.userId, wins: 1 });
};

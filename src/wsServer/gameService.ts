import { IGame } from './types';


export const games: IGame[] = [];
export const getGames = (): IGame[] => games;
export const getGame = (gameIdProp): IGame => {
    return games.find(({ gameId }) => (gameId === gameIdProp));
};
export const addGame = (userId) => {
    const idGame = games.length;

    games.push({
        gameId: idGame,
        turnId: userId,
    });

    return idGame;
};

export const setShips = ({ gameId: gameIdProp, userId, ships }) => {
    const game = games.find(({ gameId }) => (gameId === gameIdProp));
    game[userId] = ships;
};

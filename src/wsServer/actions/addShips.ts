import { setShips } from '../gameService';


export const addShips = ({ gameId, ships, userId }): void => {
    setShips({ gameId, userId, ships });
};

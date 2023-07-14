import { setShips } from '../roomService';


export const addShips = ({ gameId, ships, userId }): void => {
    setShips({ gameId, userId, ships });
};

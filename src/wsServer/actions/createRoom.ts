import { addRoom } from '../roomService';
import { getUser } from '../userService';


export const createRoom = (ws: WebSocket, userId: number, isSinglePlay?: boolean): number => {
    return addRoom(
        {
            ws,
            name: getUser(userId).name,
            userId,
        },
        isSinglePlay,
    );
};

import { addToRoom } from '../roomService';
import { getUser } from '../userService';
import { indexType } from '../types';


export const addUserToRoom = (
    ws: WebSocket,
    userIndex: indexType,
    indexRoom: indexType,
): void => {
    addToRoom(
        indexRoom,
        {
            ws,
            name: getUser(userIndex).name,
            userId: userIndex,
        },
    );
};

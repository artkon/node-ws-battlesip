import { getRooms } from '../roomService';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';


export const showAvailableRooms = (ws: WebSocket) => {
    const response = getRooms()
        .filter(({ hasStarted, isSingle }) => (!hasStarted && !isSingle))
        .map(({ roomId, roomUsers: [{ name, userId: index }] }) => ({
            roomId,
            roomUsers: [{ name, index }],
        }));

    wsSendAction(ws, ACTIONS.SHOW_AVAILABLE_ROOMS, response);
};

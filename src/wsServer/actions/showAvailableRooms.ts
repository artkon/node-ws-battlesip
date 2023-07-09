import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';
import { getRooms } from '../roomService';


export const showAvailableRooms = (ws: WebSocket) => {
    const data = getRooms()
        .filter(({ hasStarted }) => (!hasStarted))
        .map(({ roomId, roomUsers: [{ name, userId: index }] }) => ({
            roomId,
            roomUsers: [{ name, index }],
        }));

    ws.send(stringifyResponse(buildResponse(ACTIONS.SHOW_AVAILABLE_ROOMS, data)));
};

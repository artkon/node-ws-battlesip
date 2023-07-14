import { getRoom } from '../roomService';
import { addWin, getUser } from '../userService';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';
import { updateWinners } from './updateWinners';


export const finish = (wsClients, roomId, winnerId) => {
    console.log(`winner is: ${getUser(winnerId).name}`);

    addWin(winnerId);

    const room = getRoom(roomId);
    room.isFinished = true;

    room.roomUsers
        .filter(({ ws }) => Boolean(ws))
        .forEach(({ ws }) => {
            wsSendAction(ws, ACTIONS.FINISH, {
                winPlayer: winnerId,
            });
    });

    updateWinners(wsClients);
};

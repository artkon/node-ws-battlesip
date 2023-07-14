import { getRoom, getRoomUser } from '../roomService';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';
import { turn } from './turn';


export const startGame = (roomId) => {
    const room = getRoom(roomId);

    room.roomUsers
        .filter(({ ws }) => Boolean(ws))
        .forEach(({ userId, ws }, index) => {
            wsSendAction(ws, ACTIONS.START_GAME, {
                ships: getRoomUser(roomId, userId).ships,
                currentPlayerIndex: index,
            });
        });

    turn(roomId);
};

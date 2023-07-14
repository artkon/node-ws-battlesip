import { getRoom } from '../roomService';

import { ACTIONS } from './constants';
import { wsSendAction } from './utils';


export const createGame = (roomId) => {
    const users = getRoom(roomId).roomUsers.filter(({ ws }) => Boolean(ws));

    users.forEach(({ ws, userId }) => {
        wsSendAction(ws, ACTIONS.CREATE_GAME, {
            idGame: roomId,
            idPlayer: userId,
        });
    })
};

import { getRoom } from '../roomService';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';
import { attack } from './attack';
import { getRandomPosition } from '../utils';
import { wsClients } from '../index';


export const turn = (roomId, isChangeTurn = false) => {
    const room = getRoom(roomId);
    let nextTurnId = room.turnId;
    const [player1, player2] = room.roomUsers;
    if (isChangeTurn) {
        nextTurnId = (room.turnId === player2.userId) ? player1.userId : player2.userId;
        room.turnId = nextTurnId;
    }

    room.roomUsers
        .filter(({ ws }) => Boolean(ws))
        .forEach(({ ws }) => {
            wsSendAction(ws, ACTIONS.TURN, {
                currentPlayer: nextTurnId,
            });
    });

    if (room.turnId === player2.userId && player2.name === 'bot') {
        const randomPosition = getRandomPosition();
        setTimeout(() => {
            attack(
                wsClients,
                roomId,
                player1.userId,
                { indexPlayer: player2.userId, ...randomPosition, gameId: roomId },
            );
        }, 2000);
    }
};

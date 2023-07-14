import { getOpponentUser, getRoom, getRoomUser } from '../roomService';
import { IShip } from '../types';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';
import { finish } from './finish';
import { turn } from './turn';


export const attack = (wsClients, roomId, userId, data) => {
    if (getRoom(roomId).turnId !== data.indexPlayer) {
        return;
    }

    const result = calculateAttackResult({
        ...data,
        userId: data.indexPlayer === userId
            ? getOpponentUser(roomId, data.indexPlayer).userId
            : userId,
    });

    console.log(`attack: ${result}`);

    getRoom(roomId).roomUsers
        .filter(({ ws }) => Boolean(ws))
        .forEach(({ ws }) => {
            wsSendAction(ws, ACTIONS.ATTACK, {
                position: {
                    x: data.x,
                    y: data.y,
                },
                currentPlayer: data.indexPlayer,
                status: result,
            });
    });

    if (result === 'finish') {
        getRoom(roomId).isFinished = true;
        finish(wsClients, roomId, data.indexPlayer);
    } else {
        turn(roomId, result === 'miss');
    }
};

const attackLogger = new Set();
const calculateAttackResult = ({ gameId, x, y, indexPlayer, userId }): string => {
    if (attackLogger.has(`${gameId} ${indexPlayer} ${x} ${y}`)) {
        return 'Already attacked this position';
    }

    attackLogger.add(`${gameId} ${indexPlayer} ${x} ${y}`);

    const ships = getRoomUser(gameId, userId).ships;
    const attackedShip = ships.find(({ position, direction, length }: IShip) => {
        if (direction) {
            if (x === position.x) {
                if ((y >= position.y) && (y <= (position.y + length - 1))) {
                    return true;
                }
            }
        } else {
            if (y === position.y) {
                if ((x >= position.x) && (x <= (position.x + length - 1))) {
                    return true;
                }
            }
        }
    });

    if (attackedShip) {
        attackedShip.hits = attackedShip.hits ? (attackedShip.hits + 1) : 1;
        if (attackedShip.hits === attackedShip.length) {
            attackedShip.isSunk = true;

            if (ships.every(({ isSunk }) => (isSunk === true))) {
                return 'finish';
            } else {
                return 'killed';
            }
        } else {
            return 'shot';
        }
    } else {
        return 'miss';
    }
};

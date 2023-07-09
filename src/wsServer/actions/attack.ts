import { getGame } from '../gameService';
import { IShip } from '../types';


const attackLogger = new Set();
export const attack = ({ gameId, x, y, indexPlayer, userId }) => {
    if (attackLogger.has(`${gameId} ${indexPlayer} ${x} ${y}`)) {
        // return already attacked, wait for another attack
        return 'Уже было';
    }
    attackLogger.add(`${gameId} ${indexPlayer} ${x} ${y}`);

    const game = getGame(gameId);
    const ships = game[userId];
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
            return 'shot'
        }
    } else {
        return 'miss';
    }
};

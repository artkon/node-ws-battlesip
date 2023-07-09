import { getGame } from '../gameService';

import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';
import { turn } from './turn';


export const startGame = ({ users, gameId }) => {
    users.forEach(({ userId, ws }, index) => {
        const ships = getGame(gameId)[userId];
        ws.send(stringifyResponse(buildResponse(ACTIONS.START_GAME, {
            ships,
            currentPlayerIndex: index,
        })));
    });

    turn({ users, gameId });
};

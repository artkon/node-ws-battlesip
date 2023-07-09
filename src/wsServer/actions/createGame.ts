import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';


export const createGame = (idGame, users) => {
    users.forEach((user) => user.ws.send(stringifyResponse(buildResponse(ACTIONS.CREATE_GAME, {
        idGame,
        idPlayer: user.id,
    }))))
};

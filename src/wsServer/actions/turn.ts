import { getGame } from '../gameService';
import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';


export const turn = ({ users, gameId }, isChangeTurn = false) => {
    const game = getGame(gameId);
    const { turnId } = game;
    const [{ userId: player1id }, { userId: player2id }] = users;
    let nextTurnId = turnId || player1id;
    if (isChangeTurn) {
        nextTurnId = (turnId === player2id) ? player1id : player2id;
        game.turnId = nextTurnId;
    }

    users.forEach(({ ws }) => {
        ws.send(stringifyResponse(buildResponse(ACTIONS.TURN, {
            currentPlayer: nextTurnId,
        })));
    });
};

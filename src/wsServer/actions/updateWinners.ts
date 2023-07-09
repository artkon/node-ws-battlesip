import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';


export const updateWinners = (wsClients, winners) => {
    wsClients.forEach((ws) => {
        ws.send(stringifyResponse(buildResponse(ACTIONS.UPDATE_WINNERS, [
            ...winners.map(({ name, wins }) => ({
            name: name,
            wins: wins,
        }))])));
    });
};

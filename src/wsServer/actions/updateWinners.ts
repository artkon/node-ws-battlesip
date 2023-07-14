import { getUsers } from '../userService';

import { wsSendAction } from './utils';
import { ACTIONS } from './constants';


export const updateWinners = (wsClients) => {
    const winners = getUsers().filter(({ wins }) => (wins > 0));

    wsClients.forEach((ws) => {
        wsSendAction(ws, ACTIONS.UPDATE_WINNERS, [
            ...winners.map(({ name, wins }) => ({
            name: name,
            wins: wins,
        }))]);
    });
};

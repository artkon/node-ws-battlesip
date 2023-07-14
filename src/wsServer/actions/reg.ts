import { createUser, getUser } from '../userService';

import { User } from '../types';
import { logAction } from '../utils';

import { ACTION_RESULTS, ACTIONS } from './constants';
import { wsSendAction } from './utils';


export const reg = (ws, userData: User): number => {
    const userIndex = createUser(ws, userData);
    const user = getUser(userIndex);

    wsSendAction(ws, ACTIONS.REGISTRATION, {
        name: user.name,
        index: userIndex,
        error: false,
        errorText: '',
    });

    logAction(`Registration of ${user.name}`, ACTION_RESULTS.DONE);

    return userIndex;
};

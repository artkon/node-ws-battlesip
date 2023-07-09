import { createUser, getUser } from '../userService';

import { User } from '../types';
import { logAction } from '../utils';

import { ACTION_RESULTS, ACTIONS } from './constants';
import { buildResponse, stringifyResponse } from './utils';


export const reg = (ws, userData: User): number => {
    const userIndex = createUser(ws, userData);
    const user = getUser(userIndex);

    const response = stringifyResponse(buildResponse(ACTIONS.REGISTRATION, {
        name: user.name,
        index: userIndex,
        error: false,
        errorText: '',
    }));

    // TODO check if user with same name exists
    ws.send(response);

    logAction(`Registration of ${user.name}`, ACTION_RESULTS.DONE);

    return userIndex;
};

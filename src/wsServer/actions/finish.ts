import { buildResponse, stringifyResponse } from './utils';
import { ACTIONS } from './constants';


export const finish = (users, user) => {
    users.forEach(({ ws }) => {
        ws.send(stringifyResponse(buildResponse(ACTIONS.FINISH, {
            winPlayer: user.userId,
        })));
    });
};

import { actionType } from '../types';


export const wsSendAction = (ws, action: actionType, data) => ws.send(JSON.stringify({
    type: action,
    data: JSON.stringify(data),
    id: 0,
}));

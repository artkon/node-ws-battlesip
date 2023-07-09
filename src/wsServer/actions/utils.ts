import { actionType } from '../types';


// TODO fix types
export const buildResponse = (action: actionType, data) => ({
    type: action,
    data,
    id: 0,
});

// TODO fix types
export const stringifyResponse = (response) => {
    return JSON.stringify({
        ...response,
        data: JSON.stringify(response.data),
    });
};

import { Action, actionType, dataType } from '../types';


export const buildResponse = (action: actionType, data: dataType): Action<dataType> => ({
    type: action,
    data,
    id: 0,
});

export const stringifyResponse = (response: Action<dataType>) => {
    return JSON.stringify({
        ...response,
        data: JSON.stringify(response.data),
    });
};

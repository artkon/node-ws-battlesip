import { Action, dataType, User } from './types';


export const bufferToAction = (buffer: Buffer): Action<User | string> => {
    try {
        const action = JSON.parse(buffer.toString());
        action.data = JSON.parse(action.data);

        return action;
    } catch (error) {
        console.error(error);
    }
};

export const showCommand = (action: Action<dataType>) => {
    console.log('Command:');
    console.log(action);
};

export const logAction = (
    command: string,
    result: string,
): void => (
    console.log(`${command} => ${result}`)
);

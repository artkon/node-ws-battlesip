import { Action, ClientDataType } from './types';


export const bufferToAction = (buffer: Buffer): Omit<Action<ClientDataType>, 'id'> => {
    try {
        const action: Action<string> = JSON.parse(buffer.toString());
        const data: ClientDataType = action.data ? JSON.parse(action.data) : undefined;

        return { type: action.type, data };
    } catch (error) {
        console.error(error);
    }
};

export const logAction = (
    command: string,
    result: string,
): void => (
    console.log(`${command} => ${result}`)
);

export const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return { x, y };
};

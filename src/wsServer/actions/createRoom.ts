import { addRoom } from '../roomService';
import { createUser, getUser } from '../userService';
import { IShip, User } from '../types';


export const createRoom = (ws: WebSocket, userId: number, isSinglePlay?: boolean): number => {
    const roomUsers = [{
        ws,
        name: getUser(userId).name,
        userId,
    }];

    if (isSinglePlay) {
        const botId = createUser(undefined, { name: 'bot', password: 'bot' } as User);
        // @ts-ignore
        roomUsers.push({ name: 'bot', userId: botId, ships });
    }

    return addRoom(roomUsers, isSinglePlay);
};


const ships: IShip[] = [
    { position : { x: 1, y: 7 }, direction: false, type: 'huge', length: 4 },
    { position : { x: 3, y: 0 }, direction: true,type: 'large', length:3 },
    { position : { x: 7, y: 3 }, direction: true,type: 'large', length:3},
    { position : { x: 6, y: 0 }, direction: true,type: 'medium', length:2},
    { position : { x: 9, y: 5 }, direction: true,type: 'medium', length:2},
    { position : { x: 6, y: 7 }, direction: true,type: 'medium', length:2},
    { position : { x: 3, y: 4 }, direction: false,type: 'small', length:1},
    { position : { x: 9, y: 1 }, direction: true,type: 'small', length:1},
    { position : { x: 2, y: 9 }, direction: true,type: 'small', length:1},
    { position : { x: 0, y: 0 }, direction: false,type: 'small', length:1},
];

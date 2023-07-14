import WebSocket from 'ws';

import { bufferToAction } from './utils';
import {
    createRoom,
    showAvailableRooms,
    addUserToRoom,
    addShips,
    startGame,
    attack,
    reg,
    createGame,
    finish
} from './actions';
import { ACTIONS } from './actions/constants';
import { getHasUsersShips, getOpponentUser, getRoom } from './roomService';
import { getRandomPosition } from './utils';
import { getUsers } from './userService';
import { wsSendAction } from './actions/utils';


const port = 3000;

const wss = new WebSocket.Server({ port }, () => {
    console.log(`WebSocket server started on port ${port}.`);
});

export const wsClients = new Set<WebSocket>;

wss.on('connection', (ws: WebSocket) => {
    console.log('Client Connected');

    wsClients.add(ws);

    let userId;
    let roomId;

    ws.on('message', (buffer: Buffer) => {
        const { type, data } = bufferToAction(buffer);

        if (type === ACTIONS.REGISTRATION) {
            const user = getUsers().find(({ name }) => (name === data.name));
            if (user && (user.password !== data.password)) {
                console.log('Incorrect password');
                wsSendAction(ws, ACTIONS.REGISTRATION, {
                    name: user.name,
                    index: userId,
                    error: true,
                    errorText: 'Incorrect password',
                });
            } else {
                userId = reg(ws, data);
                showAvailableRooms(ws);
            }

            return;
        }

        if (type === ACTIONS.CREATE_ROOM) {
            roomId = createRoom(ws, userId);
            console.log('create room');

            wsClients.forEach((wsClient) => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    showAvailableRooms(wsClient);
                }
            });

            return;
        }

        if (type === ACTIONS.CREATE_SINGLE_ROOM) {
            roomId = createRoom(ws, userId, true);
            console.log('create room with bot');

            createGame(roomId);
            console.log('create game');

            return;
        }

        if (type === ACTIONS.JOIN_ROOM) {
            addUserToRoom(ws, userId, data.indexRoom);
            roomId = data.indexRoom;
            console.log('join room');

            createGame(roomId);
            console.log('create game');

            wsClients.forEach((wsClient) => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    showAvailableRooms(wsClient);
                }
            });


            return;
        }

        if (type === ACTIONS.ADD_SHIPS) {
            addShips({ ...data, userId });
            console.log('add ships');

            if (getHasUsersShips(roomId)) {
                startGame(roomId);
                console.log('start game');
            }

            return;
        }

        if (type === ACTIONS.ATTACK) {
            attack(wsClients,roomId, userId, data);

            return;
        }

        if (type === ACTIONS.RANDOM_ATTACK) {
            const randomPosition = getRandomPosition();
            console.log('random attack');
            attack(wsClients,roomId, userId, { ...data, ...randomPosition });

            return;
        }
    });

    ws.on('close', () => {
        if (roomId && !getRoom(roomId).isFinished) {
            const opponent = getOpponentUser(roomId, userId);
            finish(wsClients, roomId, opponent.userId);
            console.log('finish game');
        }

        wsClients.delete(ws);
        console.log('A client disconnected.');
    });

    ws.on('error', console.error);
});

wss.on('error', console.error);

wss.on('close', () => {
    console.log('Server is closed.');
});


const closeWS = () => {
    wss.close();
    console.log('WebSocket Server is down');
};

process.on('SIGINT', closeWS);
process.on('exit', () => closeWS);

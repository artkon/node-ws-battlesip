import WebSocket from 'ws';

import { bufferToAction } from './utils';
import { reg, createRoom, showAvailableRooms, addUserToRoom, createGame,
    addShips, startGame, attack, turn, finish, updateWinners,
} from './actions';
import { ACTIONS } from './actions/constants';
import { deleteRoom, getOpponentUser, getRoom, getRoomCreator, getRoomUsers } from './roomService';
import { addGame, getGame } from './gameService';
import { buildResponse, stringifyResponse } from './actions/utils';
import { addWin, getWinners } from './winnersService';


const port = 3000;

const wss = new WebSocket.Server({ port }, () => {
    console.log(`WebSocket server started on port ${port}.`);
});

const wsClients = new Set<WebSocket>;

wss.on('connection', (ws: WebSocket) => {
    console.log('Client Connected');

    wsClients.add(ws);

    let userId;
    let roomIndex; // TODO assign after join room

    // TODO console.log command and result
    ws.on('message', (buffer: Buffer) => {
        const { type, data } = bufferToAction(buffer);

        if (type === ACTIONS.REGISTRATION) {
            // check if user exists, password validation
            userId = reg(ws, data);

            return;
        }

        if (type === ACTIONS.CREATE_ROOM) {

            // TODO create free room or join room after creation
            roomIndex = createRoom(ws, userId);

            wsClients.forEach((wsClient) => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    showAvailableRooms(wsClient);
                }
            });

            return;
        }

        if (type === ACTIONS.CREATE_SINGLE_ROOM) {
            roomIndex = createRoom(ws, userId, true);

            return;
        }

        if (type === ACTIONS.JOIN_ROOM) {
            // TODO forbid join to room owner of room
            addUserToRoom(ws, userId, data.indexRoom);
            roomIndex = data.indexRoom;

            const roomCreator = getRoomCreator(roomIndex);
            const idGame = addGame(roomCreator.userId);
            createGame(idGame, [{ ws: roomCreator.ws, id: roomCreator.userId }, { ws, id: userId }]);

            wsClients.forEach((wsClient) => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    showAvailableRooms(wsClient);
                }
            });


            return;
        }

        if (type === ACTIONS.ADD_SHIPS) {
            addShips({ ...data, userId });

            const roomUsers = getRoom(roomIndex).roomUsers
                .map(({ ws, userId }) => ({ ws, userId }));
            const game = getGame(data.gameId);
            if (roomUsers.every(({ userId }) => (game[userId]?.length > 0))) {
                startGame({ users: roomUsers, gameId: data.gameId });
            }

            return;
        }

        if (type === ACTIONS.ATTACK) {
            const { turnId } = getGame(data.gameId);
            if (turnId !== data.indexPlayer) {
                console.log(`turnId: ${turnId}`)
                console.log(`indexPlayer: ${data.indexPlayer}`)
                return;
            }

            const isMyAttack = data.indexPlayer === userId;
            const opponentUserId = getOpponentUser(roomIndex, data.indexPlayer).userId;
            const result = attack({ ...data, userId: isMyAttack ? opponentUserId : userId });

            console.log(result);
            // TODO check turn, skip for cheater
            const roomUsers = getRoom(roomIndex).roomUsers
                .map(({ ws, userId }) => ({ ws, userId }));

            roomUsers.forEach(({ ws }) => {
                ws.send(stringifyResponse(buildResponse(ACTIONS.ATTACK, {
                    position: {
                        x: data.x,
                        y: data.y,
                    },
                    currentPlayer: data.indexPlayer,
                    status: result,
                })));
            });

            if (result === 'miss') {
                turn({ users: roomUsers, gameId: data.gameId }, true);

                return;
            }

            if (result === 'finish') {
                const roomUser = getRoomUsers(roomIndex, data.indexPlayer);
                addWin(roomUser);
                const winners = getWinners();
                finish(roomUsers, roomUser);
                updateWinners(wsClients, winners);

                return;
            }

            return;
        }
    });

    ws.on('error', console.error);

    ws.on('close', () => {
        // TODO finish action if it was during game, remove room
        wsClients.delete(ws);
        if (roomIndex) {
            // TODO fix deleting room
            deleteRoom(roomIndex);
        }
        console.log('A client disconnected.');
    });
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

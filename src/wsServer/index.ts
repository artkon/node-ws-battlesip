import WebSocket from 'ws';
import http from 'http';

import { bufferToAction } from './utils';
import { Action, dataType, User } from './types';
import { reg } from './actions';


const port = 3000;

const wss = new WebSocket.Server({ port }, () => {
    console.log(`WebSocket server started on port ${port}.`);
});

wss.on('connection', (ws: WebSocket) => {
    console.log('Client Connected');

    ws.on('message', (buffer: Buffer) => {
        const action: Action<dataType> = bufferToAction(buffer);

        if (action.type === 'reg') {
            reg(ws, action.data as User);

            return;
        }
    });

    ws.on('error', console.error);

    ws.on('close', () => {
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

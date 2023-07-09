export type nameType = string;
export type actionType = string;
export type indexType = number;
export type idType = number;

export interface User {
    ws: WebSocket;
    name: nameType;
    password: string;
}

export interface Action<Data> {
    type: actionType;
    data: Data;
    id: idType;
}
// TODO fix any
export type ClientDataType = any
export type ServerAction = ServerRegistrationAction

export type ClientRegistrationAction = Action<User>
export type ClientCreateRoomAction = Action<ClientCreateActionPayload>
type ClientCreateActionPayload = undefined;
interface ClientJoinRoomActionPayload {
    indexRoom: indexType,
}
export type ClientJoinRoomAction = Action<ClientJoinRoomActionPayload>

interface ServerRegistrationActionPayload {
    name: nameType;
    index: indexType;
    error: boolean;
    errorText: string;
}
export type ServerRegistrationAction = Action<ServerRegistrationActionPayload>


export interface RoomUser {
    ws: WebSocket;
    name: nameType;
    userId: idType;
}

export interface Room {
    roomId: idType;
    roomUsers: RoomUser[];
    isSingle?: boolean;
    hasStarted?: boolean;
}

export interface Winner {
    name: nameType,
    id: idType,
    wins: number,
}

export interface IShip {
    position: {
        x: number;
        y: number;
    };
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge'
    hits?: number;
    isSunk?: boolean;
}

export interface IGame {
    gameId: idType;
    [key: idType]: IShip[];
    turnId: idType,
}

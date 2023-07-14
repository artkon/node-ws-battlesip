export type nameType = string;
export type actionType = string;
export type indexType = number;
export type idType = number;

export interface User {
    ws?: WebSocket;
    name: nameType;
    id: idType;
    password: string;
    wins?: number;
}

export interface Action<Data> {
    type: actionType;
    data: Data;
    id: idType;
}
// TODO fix any
export type ClientDataType = any

export interface RoomUser {
    ws?: WebSocket;
    name: nameType;
    userId: idType;
    ships?: IShip[]
}

export interface Room {
    roomId: idType;
    roomUsers: RoomUser[];
    isSingle?: boolean;
    hasStarted?: boolean;
    isFinished: boolean;
    turnId?: idType;
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

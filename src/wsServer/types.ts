export interface User {
    name: string;
    password: string;
}


export type dataType = User | object | string;
export type actionType = string;

export interface Action<T> {
    type: actionType;
    data: T;
    id: number;
}

import { User } from './types';


const users: User[] = [];

export const getUsers = (): User[] => users;
export const getUser = (userId: number): User => users[userId];
export const createUser = (ws: WebSocket, user: User): number => {
    const usersCount = users.push({
        ws,
        name: user.name,
        password: user.password,
        id: users.length,
    });

    return usersCount - 1;
};

export const addWin = (userId) => {
    const user = getUser(userId);
    user.wins = (user.wins + 1) || 1;
};

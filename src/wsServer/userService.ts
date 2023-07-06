import { User } from './types';


const users: User[] = [];

export const getUsers = (): User[] => users;
export const getUser = (userIndex: number): User => users[userIndex];
export const createUser = (user: User): number => {
    const usersCount = users.push({
        name: user.name,
        password: user.password,
    });

    const userIndex = usersCount - 1;

    return userIndex;
};

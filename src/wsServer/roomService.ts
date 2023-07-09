import { Room, RoomUser, indexType } from './types';


const rooms: Room[] = [];
export const getRooms = (): Room[] => rooms;
export const getRoom = (roomIndex: number): Room => rooms[roomIndex];
export const getRoomCreator = (roomIndex: number): RoomUser => rooms[roomIndex].roomUsers[0];
export const addRoom = (roomUser: RoomUser, isSingleRoom?: boolean): number => {
    const roomIndex = rooms.length;

    rooms.push({
        roomId: roomIndex,
        roomUsers: [roomUser],
        isSingle: isSingleRoom,
        hasStarted: false,
    });

    return roomIndex;
};

export const addToRoom = (indexRoom: indexType, roomUser: RoomUser) => {
    rooms[indexRoom].roomUsers.push(roomUser);
    rooms[indexRoom].hasStarted = true;
};

export const deleteRoom = (indexRoom: indexType) => {
    rooms[indexRoom] = undefined;
};

export const getOpponentUser = (indexRoom: indexType, opponentId: indexType): RoomUser => {
    return getRoom(indexRoom).roomUsers
        .find(({ userId }) => (userId !== opponentId));
};

export const getRoomUsers = (roomId, userIdProp): RoomUser => {
    return getRoom(roomId).roomUsers
        .find(({ userId }) => (userId === userIdProp));
};

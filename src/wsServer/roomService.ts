import { Room, RoomUser, indexType } from './types';


const rooms: Room[] = [];
export const getRooms = (): Room[] => rooms;
export const getRoom = (roomIndex: number): Room => rooms[roomIndex];
export const addRoom = (roomUsers: RoomUser[], isSingleRoom?: boolean): number => {
    const roomIndex = rooms.length;

    rooms.push({
        roomId: roomIndex,
        roomUsers,
        isSingle: isSingleRoom,
        hasStarted: false,
        turnId: roomUsers[0].userId,
        isFinished: false,
    });

    return roomIndex;
};

export const addToRoom = (indexRoom: indexType, roomUser: RoomUser) => {
    rooms[indexRoom].roomUsers.push(roomUser);
    rooms[indexRoom].hasStarted = true;
};

export const getOpponentUser = (indexRoom: indexType, opponentId: indexType): RoomUser => {
    return getRoom(indexRoom).roomUsers
        .find(({ userId }) => (userId !== opponentId));
};

export const getRoomUser = (roomId, userIdProp): RoomUser => {
    return getRoom(roomId).roomUsers
        .find(({ userId }) => (userId === userIdProp));
};

export const setShips = ({ gameId, userId: roomUserId, ships }) => {
    const room = rooms.find(({ roomId }) => (roomId === gameId));
    const roomUser = room.roomUsers.find(({ userId }) => (userId === roomUserId));
    roomUser.ships = ships;
};

export const getHasUsersShips = (roomId) => {
    return getRoom(roomId).roomUsers
        .every(({ ships }) => (ships?.length > 0));
};

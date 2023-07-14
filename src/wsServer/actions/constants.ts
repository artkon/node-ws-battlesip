export enum ACTIONS {
    REGISTRATION = 'reg',
    CREATE_ROOM = 'create_room',
    CREATE_SINGLE_ROOM = 'single_play',
    SHOW_AVAILABLE_ROOMS = 'update_room',
    JOIN_ROOM = 'add_user_to_room',
    CREATE_GAME = 'create_game',
    ADD_SHIPS = 'add_ships',
    START_GAME = 'start_game',
    TURN = 'turn',
    RANDOM_ATTACK = 'randomAttack',
    ATTACK = 'attack',
    FINISH = 'finish',
    UPDATE_WINNERS = 'update_winners',
}

export enum ACTION_RESULTS {
    DONE = 'Done',
    ERROR = 'Error',
}

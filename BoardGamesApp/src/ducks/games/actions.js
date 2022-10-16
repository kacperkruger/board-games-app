import types from './types';

const gamesRequestStart = ( ) => ({
    type: types.START
});

const gamesRequestFailure = ( error ) => ({
    type: types.FAIL,
    payload: error
});

const gameList = ( games ) => ({
    type: types.LIST,
    payload: games
});

const gameAdd = ( game ) => ({
    type: types.ADD,
    payload: game
});

const gameDeleteByPublisher = ( publisherId ) => ({
    type: types.DELETE_PUBLISHER_GAMES,
    payload: publisherId
});

const gameDelete = ( id ) => ({
    type: types.DELETE,
    payload: id
});

const gameUpdate = ( game ) => ({
    type: types.UPDATE,
    payload: game
});

const actions = {
    gamesRequestStart,
    gamesRequestFailure,
    gameList,
    gameAdd,
    gameDeleteByPublisher,
    gameDelete,
    gameUpdate
};

export default actions;
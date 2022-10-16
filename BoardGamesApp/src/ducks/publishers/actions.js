import types from './types';

const publishersRequestStart = () => ({
    type: types.START
});

const publishersRequestFailure = ( error ) => ({
    type: types.FAIL,
    payload: error
});

const publisherList = ( publishers ) => ({
    type: types.LIST,
    payload: publishers
});

const publisherAdd = ( publisher ) => ({
    type: types.ADD,
    payload: publisher
});

const publisherAddGame = ( game ) => ({
    type: types.ADD_GAME,
    payload: game
})

const publisherDeleteGame = ( game ) => ({
    type: types.DELETE_GAME,
    payload: game
})

const publisherDelete = ( id ) => ({
    type: types.DELETE,
    payload: id
});

const publisherUpdate = ( publisher ) => ({
    type: types.UPDATE,
    payload: publisher
});

const actions = {
    publishersRequestStart,
    publishersRequestFailure,
    publisherList,
    publisherAdd,
    publisherAddGame,
    publisherDeleteGame,
    publisherDelete,
    publisherUpdate
};

export default actions;


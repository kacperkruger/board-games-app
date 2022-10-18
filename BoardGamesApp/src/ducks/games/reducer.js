import types from './types'

const init = {
    games: undefined,
    loading: false,
    error: ''
};

const gamesReducer = (state = init, action) => {
    switch (action.type) {
        case types.START:
            return {...state, loading: true};
        case types.FAIL:
            return {...state, loading: false, error: action.payload};
        case types.LIST:
            return {...state, games: action.payload, loading: false};
        case types.ADDED:
        case types.ADD:
            return {...state, games: [...state.games, action.payload], loading: false};
        case types.UPDATED:
        case types.UPDATE:
            return {...state, games: state.games.map(game =>
                    game._id === action.payload._id
                        ? action.payload
                        : game),
                loading: false}
        case types.DELETED:
        case types.DELETE:
            return {...state, games: state.games.filter(game => game._id !== action.payload), loading: false};
        case types.DELETED_PUBLISHER_GAMES:
        case types.DELETE_PUBLISHER_GAMES:
            return {...state, games: state.games.filter(game => game.publisher !== action.payload), loading: false};
        default:
            return state
    }
};

export default gamesReducer;
import types from './types'

const init = {
    publishers: undefined,
    loading: false,
    error: ''
};

const publisherReducer = (state = init, action) => {
    switch (action.type) {
        case types.START:
            return {...state, loading: true};
        case types.FAIL:
            return {...state, loading: false, error: action.payload};
        case types.LIST:
            return {...state, publishers: action.payload, loading: false};
        case types.ADDED:
        case types.ADD:
            return {...state, publishers: [...state.publishers, action.payload], loading: false};
        case types.ADDED_GAME:
        case types.ADD_GAME:
            return {...state, publishers: state.publishers.map(publisher =>
                    publisher._id === action.payload.publisher
                        ? {...publisher, games:[...publisher.games, action.payload._id]}
                        : publisher),
                loading: false}
        case types.DELETED_GAME:
        case types.DELETE_GAME:
            return {...state, publishers: state.publishers.map(publisher =>
                    publisher._id === action.payload.publisher
                        ? {...publisher, games: state.games.filter(game => game._id !== action.payload._id)}
                        : publisher),
                loading: false}
        case types.UPDATED:
        case types.UPDATE:
            return {...state, publishers: state.publishers.map(publisher =>
                    publisher._id === action.payload._id
                        ? action.payload
                        : publisher),
                loading: false}
        case types.DELETED:
        case types.DELETE:
            return {...state, publishers: state.publishers.filter(publisher => publisher._id !== action.payload), loading: false};
        default:
            return state;
    }
};

export default publisherReducer;
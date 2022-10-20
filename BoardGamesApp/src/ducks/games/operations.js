import actions from './actions';
import publisherActions from './../publishers/actions';
import axios from 'axios';

const url = 'http://board-games-app.k8s/api/games'

const getGameList = () => {
    return async dispatch => {
        dispatch(actions.gamesRequestStart());
        try {
            const response = await axios.get(url);
            dispatch(actions.gameList(response.data));
        } catch (error) {
            dispatch(actions.gamesRequestFailure(error.message));
        }
    }
};

const addGame = (game) => {
    return async dispatch => {
        dispatch(actions.gamesRequestStart());
        try {
            const response = await axios.post(url, game);
            if (response.status === 500) {
                dispatch(actions.gamesRequestFailure(response.data));
                return 500;
            }
            dispatch(actions.gameAdd(response.data));
            dispatch(publisherActions.publisherAddGame(response.data))
            return 200;
        } catch (error) {
            dispatch(actions.gamesRequestFailure(error.message));
            return 500;
        }
    }
};

const sortGames = (games) => {
    return async dispatch => {
        dispatch(actions.gamesRequestStart());
        try {
            dispatch(actions.gameList(games))
        } catch (error) {
            dispatch(actions.gamesRequestFailure(error));
        }
    }
}

const updateGame = (game) => {
    return async dispatch => {
        dispatch(actions.gamesRequestStart());
        try {
            const response = await axios.put(url + `/${game._id}`, game);
            if (response.status === 400) {
                dispatch(actions.gamesRequestFailure(response.data));
                return 400
            }
            dispatch(actions.gameUpdate(response.data));
            return 200
        } catch (error) {
            dispatch(actions.gamesRequestFailure(error.message));
            return 500
        }
    }
};

const deleteGame = (game) => {
    return async dispatch => {
        dispatch(actions.gamesRequestStart())
        try {
            const response = await axios.delete(url + `/${game._id}`);
            if (response.status === 400) {
                return dispatch(actions.gamesRequestFailure(response.data));
            }
            dispatch(actions.gameDelete(game._id));
            dispatch(publisherActions.publisherDeleteGame(game))
        } catch (error) {
            dispatch(actions.gamesRequestFailure(error.message));
        }
    }
};

const operations = {
    getGameList,
    addGame,
    sortGames,
    updateGame,
    deleteGame
};

export default operations;
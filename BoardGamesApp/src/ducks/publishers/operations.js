import gameActions from './../games/actions';
import actions from './actions';
import axios from 'axios';

const url = 'http://board-games-app.k8s/api/publishers/';

const getPublisherList = () => {
    return async dispatch => {
        dispatch(actions.publishersRequestStart());
        try {
            const response = await axios.get(url);
            dispatch(actions.publisherList(response.data));
        } catch (error) {
            dispatch(actions.publishersRequestFailure(error.message));
        }
    }
};

const sortPublishers = (publishers) => {
    return async dispatch => {
        dispatch(actions.publishersRequestStart());
        try {
            dispatch(actions.publisherList(publishers))
        } catch (error) {
            dispatch(actions.publishersRequestFailure(error));
        }
    }
}


const addPublisher = (publisher) => {
    return async dispatch => {
        dispatch(actions.publishersRequestStart());
        try {
            const response = await axios.post(url, publisher);
            if (response.status === 500) {
                dispatch(actions.publishersRequestFailure(response.data));
                return 500;
            }
            dispatch(actions.publisherAdd(response.data));
            return 200;
        } catch (error) {
            dispatch(actions.publishersRequestFailure(error.message));
            return 500;
        }
    }
};

const updatePublisher = (publisher) => {
    return async dispatch => {
        dispatch(actions.publishersRequestStart());
        try {
            const response = await axios.put(url + `/${publisher._id}`, publisher);
            if (response.status === 400) {
                dispatch(actions.publishersRequestFailure(response.data));
                return 400
            }
            dispatch(actions.publisherUpdate(response.data));
            return 200
        } catch (error) {
            dispatch(actions.publishersRequestFailure(error.message));
            return 500
        }
    }
};

const deletePublisher = (publisher) => {
    return async dispatch => {
        dispatch(actions.publishersRequestStart())
        try {
            const response = await axios.delete(url + `/${publisher._id}`);
            if (response.status === 400) {
                return dispatch(actions.publishersRequestFailure(response.data));
            }
            dispatch(actions.publisherDelete(publisher._id));
            dispatch(gameActions.gameDeleteByPublisher(publisher._id));
        } catch (error) {
            dispatch(actions.publishersRequestFailure(error.message));
        }
    }
};

const operations = {
    getPublisherList,
    sortPublishers,
    addPublisher,
    updatePublisher,
    deletePublisher
};

export default operations;
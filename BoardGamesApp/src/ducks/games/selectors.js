const getGameDetails = ( state, id ) => {
    try {
        return state.games.games.find(game => game._id === id);
    } catch (error) {
        console.log(error)
    }
}

const getGameCategories = ( state ) => {
    try {
        return state.games.games.reduce((prev, curr) => {
            if (prev.includes(curr.category)) {
                return prev;
            }
            return [...prev, curr.category]
        }, [])
    } catch (error) {
        console.log(error)
    }
}

const getPublisherGames = (state, publisherId) => {
    try {
        const gamesId = state.publishers.publishers?.find(publisher => publisher._id === publisherId).games;
        return state.games.games.filter(game => gamesId.includes(game._id))
    } catch (error) {
        console.log(error);
    }
}

const selectors = {
    getGameDetails,
    getGameCategories,
    getPublisherGames
}

export default selectors;
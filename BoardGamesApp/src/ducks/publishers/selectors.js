const getPublisherDetails = ( state, id ) => {
    try {
        return state.publishers.publishers.find(publisher => publisher._id === id)
    } catch (error) {
        console.log(error)
    }
}

const getPublisherFromGame = ( state, gameId ) => {
    try {
        const game = state.games.games.find(game => game._id === gameId)
        return state.publishers.publishers.find(publisher => publisher._id === game.publisher)
    } catch (error) {
        console.log(error)
    }
}

const selectors = {
    getPublisherDetails,
    getPublisherFromGame
}

export default selectors;
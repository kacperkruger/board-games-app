import { publisherOperations, publisherSelectors } from "../../ducks/publishers";
import { connect } from "react-redux";
import { useEffect } from 'react';
import { gameOperations, gameSelectors } from '../../ducks/games';
import { Link } from 'react-router-dom';
import Image from './../components/Image';
import ButtonDetails from './../components/ButtonDetails';

const GameDetails = ({ game, loading, publisher, getGameList, id, deleteGame, getPublisherList }) => {
    useEffect(() => {
        if (game === undefined) {
            getGameList()
        }
        if (publisher === undefined) {
            getPublisherList()
        }
    },[id, game, publisher, getGameList, getPublisherList]);

    return (
        <div>
            <h1>Game Details</h1>
            {loading ?
                <div>Loading...</div>
                :
                game && publisher ?
                    <div className="game-container container mt-5 d-flex flex-column gap-5">
                        <ButtonDetails item={game} deleteOperation={deleteGame} navigateUrl='games' />
                        <div className="image" >
                            <Image image_url={game.image_url} big={true} />
                        </div>
                        <div className="col d-flex flex-column gap-4">
                            <div className='d-flex gap-1 flex-column'>
                                <div className='d-flex gap-1'>
                                    <div className='name fw-bold'>{game.name}</div>
                                    <div className='year text-secondary'>({game.year_published})</div>
                                </div>
                                {game.short_description && <div className='short-description text-start'>{game.short_description}</div>}
                            </div>

                            <div className="d-flex border-top pt-4 align-items-center">
                                <div className="flex-fill fw-bold">{game.min_players} - {game.max_players} Players</div>
                                <div className="flex-fill ">
                                    <div className="fw-bold">{game.min_time} - {game.max_time} Min</div>
                                    <div className='fs-6'>Playing time</div>
                                </div>
                                <div className="flex-fill fw-bold">Age: {game.min_age}+</div>
                            </div>
                            <div className="pt-4 d-flex gap-1">
                                <div className="fw-bold">Publisher:</div>
                                <Link to={`/publishers/${publisher._id}`} className="link-primary">{publisher.name}</Link>
                            </div>
                            <div className="d-flex border-top pt-4 gap-1 align-items-start">
                                <div className="fw-bold">Description:</div>
                                <div className="text-start">{game.description}</div>
                            </div>
                            <div className="d-flex border-top pt-4 gap-1 align-items-start">
                                <div className="fw-bold">Category:</div>
                                <div className="text-start">{game.category}</div>
                            </div>
                            <div className="d-flex border-top pt-4 pb-4 gap-1 justify-content-center">
                                <div className="fw-bold">Buy a Copy From</div>
                                <div className='text-success fw-bold'>${game.price}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-danger text-uppercase fw-bold">Error could not find the game</div>}
        </div>
    )
}

const mapStateToProps = (state, {id}) => {
    return {
        game: gameSelectors.getGameDetails(state, id),
        loading: state.games.loading,
        publisher: publisherSelectors.getPublisherFromGame(state, id)
    }
}

const mapDispatchToProps = {
    getGameList: gameOperations.getGameList,
    deleteGame: gameOperations.deleteGame,
    getPublisherList: publisherOperations.getPublisherList,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { gameOperations } from './../../ducks/games/index';
import { useNavigate } from 'react-router-dom';
import ButtonList from './../components/ButtonList';
import Image from './../components/Image';


const GameList = ({ games, loading, error, getGameList, sortGames }) => {
    const sortValues = [['name', 'Name'], ['year_published', 'Year of publication'], ['price', 'Price']];
    const navigate = useNavigate()

    useEffect(() => {
        if (games === undefined) {
            getGameList()
        }
    },[games, getGameList]);

    const handleGameClick = (id) => {
        navigate(`/games/${id}`);
    }

    return (
        <div>
            <h1>Game List</h1>
            <div className="container mt-5 w-100 d-flex flex-column justify-content-center gap-3">
                <ButtonList componentName='Game' items={games} navigateUrl='games' sortValues={sortValues} sortOperation={sortGames} />
            </div>
            {loading ?
                <div>Loading...</div>
                : games ?
                    <div className="games-container container mt-5 w-100 d-flex flex-column justify-content-center gap-3">
                        {games && games.map((game, index) =>
                            <div key={index} className='d-flex game justify-content-center gap-3 align-items-center' onClick={() => handleGameClick(game._id)}>
                                <Image image_url={game.image_url} big={false} />
                                <div className='middle d-flex flex-column gap-1 flex-grow-1 align-items-center'>
                                    <div className='d-flex gap-1'>
                                        <div className='name fw-bold'>{game.name}</div>
                                        <div className='year text-secondary'>({game.year_published})</div>
                                    </div>
                                    {game.short_description && <div className='short-description'>{game.short_description}</div>}
                                </div>
                                <div className='price text-success fw-bold'>
                                    ${game.price}
                                </div>
                            </div>
                        )}
                    </div>
                    : <div className='text-danger text-uppercase fw-bold'>{error}</div>}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        games: state.games.games,
        loading: state.games.loading,
        error: state.games.error
    };
};

const mapDispatchToProps = {
    getGameList: gameOperations.getGameList,
    sortGames: gameOperations.sortGames
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
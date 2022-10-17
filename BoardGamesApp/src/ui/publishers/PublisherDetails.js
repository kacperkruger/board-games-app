import { connect } from "react-redux";
import { useEffect } from 'react';
import { publisherOperations, publisherSelectors } from '../../ducks/publishers';
import { gameSelectors, gameOperations } from '../../ducks/games';
import { Link } from 'react-router-dom';
import ButtonDetails from './../components/ButtonDetails';
import Image from './../components/Image';
import AddressFrame from './../components/AddressFrame';

const PublisherDetails = ({ publisher, loading, games, getPublisherList, getGameList, id, deletePublisher }) => {
    useEffect(() => {
        if (publisher === undefined) {
            getPublisherList(id)
        }
        if (games === undefined) {
            getGameList(id)
        }
    },[id, publisher, games, getPublisherList, getGameList]);

    return (
        <div>
            <h1>Publisher Details</h1>
            {loading ?
                <div>Loading...</div>
                :
                publisher ?
                    <div className="game-container container mt-5 pb-5 d-flex flex-column gap-5">
                        <ButtonDetails item={publisher} deleteOperation={deletePublisher} navigateUrl='publishers' />
                        <div className="image" >
                            <Image image_url={publisher.image_url} big={true} />
                        </div>
                        <div className="col d-flex flex-column gap-4">
                            <div className='d-flex gap-1 flex-column'>
                                <div className='d-flex gap-1'>
                                    <a href={`${publisher.official_link}`} rel='noreferrer' target='_blank' className='name fw-bold primary-link'>{publisher.name}</a>
                                    <div className='year text-secondary'>({publisher.creation_year})</div>
                                </div>
                            </div>
                            <div className="d-flex border-top pt-4 gap-1 align-items-start">
                                <div className="fw-bold">Description:</div>
                                <div className="text-start">{publisher.description}</div>
                            </div>
                            <div className='address-box rounded d-flex flex-column align-items-start border-top pt-4 gap-1'>
                                <div className='fw-bold'>Address:</div>
                                <AddressFrame street_name={publisher.street_name} street_number={publisher.street_number}
                                              apartament_number={publisher.apartment_number} city={publisher.city} />
                            </div>
                            <div className="games-container d-flex flex-column gap-2 border-top pt-4">
                                <div className="fw-bold text-start">Games:</div>
                                <div className="games d-flex fle-wrap w-75 align-self-center justify-content-center gap-2">
                                    {games && games.map((game, index) =>
                                        <Link to={`/games/${game._id}`} key={index} className='box-img rounded'>
                                            <Image image_url={game.image_url} big={false} />
                                            <div className='hover-name'>{game.name}</div>
                                        </Link>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-danger text-uppercase fw-bold">Error could not find the publisher</div>}
        </div>
    )
}

const mapStateToProps = (state, { id }) => {
    return {
        publisher: publisherSelectors.getPublisherDetails(state, id),
        loading: state.publishers.loading,
        games: gameSelectors.getPublisherGames(state, id)
    }
}

const mapDispatchToProps = {
    getPublisherList: publisherOperations.getPublisherList,
    deletePublisher: publisherOperations.deletePublisher,
    getGameList: gameOperations.getGameList,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetails);
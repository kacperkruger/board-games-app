import { connect } from 'react-redux';
import { useEffect } from 'react';
import { publisherOperations } from './../../ducks/publishers/index';
import { useNavigate } from 'react-router-dom';
import ButtonList from './../components/ButtonList';
import Image from './../components/Image';

const PublisherList = ({ publishers, loading, error, getPublisherList, sortPublishers }) => {
    const sortValues = [['name', 'Name'], ['creation_year', 'Year of creation'], ['games', 'Number of games']]
    const navigate = useNavigate()

    useEffect(() => {
        if (publishers === undefined) {
            getPublisherList()
        }
    },[publishers, getPublisherList]);

    const handlePublisherClick = (id) => {
        navigate(`/publishers/${id}`);
    }

    return (
        <div>
            <h1>Publisher List</h1>
            <div className="container mt-5 w-100 d-flex flex-column justify-content-center gap-3">
                <ButtonList componentName='Publisher' items={publishers} navigateUrl='publishers' sortValues={sortValues} sortOperation={sortPublishers} />
            </div>
            {loading ?
                <div>Loading...</div>
                : publishers ?
                    <div className="publisher-container container mt-5 w-100 d-flex flex-wrap justify-content-center gap-3">
                        {publishers && publishers.map((publisher, index) =>
                            <div key={index} className='d-flex game flex-column justify-content-center gap-1 align-items-center' onClick={() => handlePublisherClick(publisher._id)}>
                                <Image image_url={publisher.image_url} big={false} />
                                <div className='middle d-flex flex-column gap-1 flex-grow-1 align-items-center'>
                                    {publisher.name}
                                </div>
                            </div>
                        )}
                    </div>
                    : <div className='text-danger fw-bold text-uppercase'>{error}</div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        publishers: state.publishers.publishers,
        loading: state.publishers.loading,
        error: state.publishers.error
    };
};

const mapDispatchToProps = {
    getPublisherList: publisherOperations.getPublisherList,
    sortPublishers: publisherOperations.sortPublishers
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherList);
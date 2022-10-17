import { useParams } from 'react-router-dom';
import PublisherDetails from './PublisherDetails';

const PublisherDetailsProps = () => {
    const { id } = useParams()

    return (
        <div>
            <PublisherDetails id={id} />
        </div>
    )
}

export default PublisherDetailsProps;
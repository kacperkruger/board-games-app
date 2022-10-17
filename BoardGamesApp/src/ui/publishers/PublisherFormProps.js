import PublisherForm from './PublisherForm';
import { useParams } from 'react-router-dom';

const PublisherFormProps = () => {
    const { id } = useParams()

    return (
        <div>
            <PublisherForm id={id} />
        </div>
    )
}

export default PublisherFormProps;
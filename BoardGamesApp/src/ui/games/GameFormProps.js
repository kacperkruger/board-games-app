import GameForm from './GameForm';
import { useParams } from 'react-router-dom';

const GameFormProps = () => {
    const { id } = useParams()

    return (
        <div>
            <GameForm id={id} />
        </div>
    )
}

export default GameFormProps;
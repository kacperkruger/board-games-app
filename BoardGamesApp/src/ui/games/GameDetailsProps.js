import { useParams } from 'react-router-dom'
import GameDetails from './GameDetails'

const GameDetailsProps = () => {
    const { id } = useParams()

    return (
        <div>
            <GameDetails id={id} />
        </div>
    )
}

export default GameDetailsProps;
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="container home d-flex flex-column align-items-center justify-content-center gap-3">
            <h1>Home Page</h1>
            <ul className="list-group">
                <li className="list-group-item list-group-item-action"><Link to='/games' >Games</Link></li>
                <li className="list-group-item"><Link to='/publishers'>Publishers</Link></li>
            </ul>
        </div>
    )
};

export default Home;
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className='d-flex justify-content-around align-items-center pt-4 mb-4 container-fluid'>
            <Link to='/' className='navbar-brand h1 text-dark'>BoardGamesApp</Link>
            <div className='d-flex gap-3'>
                <Link to='/games' className='nav-link text-dark'>Games</Link>
                <Link to='/publishers' className='nav-link text-dark'>Publishers</Link>
            </div>
        </nav>
    )
};

export default Navbar;
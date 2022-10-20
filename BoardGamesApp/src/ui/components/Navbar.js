import { Link } from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";

const Navbar = () => {
    const { keycloak } = useKeycloak()
    return(
        <div className='d-flex justify-content-between pt-3 mb-4 container-fluid'>
            <nav className='d-flex align-items-center gap-3'>
                <Link to='/' className='navbar-brand fw-bold text-dark'>BoardGamesApp</Link>
                <div className='d-flex align-items-center pt-1 gap-2'>
                    <Link to='/games' className='nav-link text-dark'>Games</Link>
                    <Link to='/publishers' className='nav-link text-dark'>Publishers</Link>
                </div>
            </nav>
            <div className="pt-1">
                {!keycloak.authenticated && (
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => keycloak.login()}
                    >
                        Login
                    </button>
                )}
                {keycloak.authenticated && (
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => keycloak.logout()}
                    >
                        Logout ({keycloak.tokenParsed.preferred_username})
                    </button>
                )}
            </div>
        </div>

    )
};

export default Navbar;
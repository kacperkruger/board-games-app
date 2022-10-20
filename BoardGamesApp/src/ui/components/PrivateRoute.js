import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({validPage}) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? validPage : <Navigate to={{pathname: '/'}}/>;
};

export default PrivateRoute;

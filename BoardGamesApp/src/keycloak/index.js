import Keycloak from 'keycloak-js'

const keycloakConfig = {
    url: 'http://auth.board-games-app.k8s/',
    realm: 'board-games-realm',
    clientId: 'board-games-app'
}

const keycloak = new Keycloak(keycloakConfig)

keycloak.onTokenExpired = () => {
    window.location.reload()
};


export default keycloak

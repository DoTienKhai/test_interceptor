export const KEYCLOAK_CONFIG = {
    url: 'http://localhost:8080/auth',
    realm: 'master',
    clientId: 'vtt-angular',
    bearerExcludedUrls: ['/assets']
};
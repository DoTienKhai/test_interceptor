import {KeycloakService} from 'keycloak-angular';
import { KEYCLOAK_CONFIG } from 'src/app/app.config';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () => keycloak.init({
            config: {
                url: KEYCLOAK_CONFIG.url,
                realm: KEYCLOAK_CONFIG.realm,
                clientId: KEYCLOAK_CONFIG.clientId
            },
            bearerExcludedUrls: KEYCLOAK_CONFIG.bearerExcludedUrls,
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false,
                checkLoginIframeInterval: 25
            },
            loadUserProfileAtStartUp: true
        });
}

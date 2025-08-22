const fetch = require('node-fetch');
const AuthResult = require('./AuthResult');
const CleanTalkException = require('./Exception/CleanTalkException');

class KolasAiOAuthClient {
    static BASE_URL = 'https://app.kolas.ai';
    static AUTH_ENDPOINT = '/oauth/token';

    /**
     * @param {string} clientId
     * @param {string} clientSecret
     * @returns {Promise<AuthResult>}
     * @throws {CleanTalkException}
     */
    async auth(clientId, clientSecret) {
        const url = KolasAiOAuthClient.BASE_URL + KolasAiOAuthClient.AUTH_ENDPOINT;
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });
            const data = await response.json();

            if (!data.access_token) {
                throw new CleanTalkException('OAuth2 authentication failed: ' + JSON.stringify(data));
            }

            return AuthResult.fromObject(data);
        } catch (e) {
            throw new CleanTalkException('Auth request failed.', { cause: e });
        }
    }
}

module.exports = KolasAiOAuthClient;


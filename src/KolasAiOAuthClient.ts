import axios, { AxiosInstance } from 'axios';
import { AuthResult } from './AuthResult';
import { CleanTalkException } from './Exception/CleanTalkException';

export class KolasAiOAuthClient {
    private static BASE_URL = 'https://app.kolas.ai';
    private static AUTH_ENDPOINT = 'oauth/token';

    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: KolasAiOAuthClient.BASE_URL,
            timeout: 10000,
        });
    }

    /**
     * Authenticate with Kolas AI OAuth2.
     * @param clientId
     * @param clientSecret
     * @returns Promise<AuthResult>
     * @throws CleanTalkException
     */
    // @ts-ignore
    async auth(clientId: string, clientSecret: string): Promise<AuthResult> {
        try {
            const response = await this.httpClient.post(
                KolasAiOAuthClient.AUTH_ENDPOINT,
                new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: clientId,
                    client_secret: clientSecret,
                }),
                {
                    headers: { Accept: 'application/json' },
                }
            );

            const data = response.data;

            if (!data['access_token']) {
                throw new CleanTalkException('OAuth2 authentication failed: ' + JSON.stringify(data));
            }

            return AuthResult.fromObject(data);
        } catch (e: any) {
            throw new CleanTalkException('Auth request failed.', e);
        }
    }
}

export default KolasAiOAuthClient;

import axios from 'axios';
import {AxiosInstance} from 'axios';
import {AuthResult} from '../src/AuthResult';
import {KolasAiOAuthClient} from '../src/KolasAiOAuthClient';
import {CleanTalkException} from '../src/Exception/CleanTalkException';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('KolasAiOAuthClient', () => {
    let client: KolasAiOAuthClient;
    let mockInstance: jest.Mocked<AxiosInstance>;

    const TEST_TOKEN = 'token';
    const TEST_TOKEN_TYPE = 'Bearer';
    const TEST_EXPIRES_IN = '3600';

    beforeEach(() => {
        mockInstance = {
            post: jest.fn(),
        } as any;
        mockedAxios.create.mockReturnValue(mockInstance);
        client = new KolasAiOAuthClient();
    });

    it('should return AuthResult on successful auth', async () => {
        const mockData = {
            access_token: TEST_TOKEN,
            token_type: TEST_TOKEN_TYPE,
            expires_in: TEST_EXPIRES_IN,
        };
        mockInstance.post.mockResolvedValue({data: mockData});
        const result = await client.auth('id', 'secret');
        expect(result).toBeInstanceOf(AuthResult);
        expect(result.getAccessToken()).toBe(TEST_TOKEN);
        expect(result.getTokenType()).toBe(TEST_TOKEN_TYPE);
        expect(result.getExpiresIn()).toBe(TEST_EXPIRES_IN);
    });

    it('should throw CleanTalkException on axios error', async () => {
        mockInstance.post.mockRejectedValue(new Error('fail'));
        await expect(client.auth('id', 'secret')).rejects.toThrow(CleanTalkException);
        await expect(client.auth('id', 'secret')).rejects.toThrow('OAuth authentication failed: fail');
    });

    it('should throw CleanTalkException if response data is invalid', async () => {
        mockInstance.post.mockResolvedValue({data: {}});
        await expect(client.auth('id', 'secret')).rejects.toThrow(CleanTalkException);
    });
});

import axios from 'axios';
import {AxiosInstance} from 'axios';
import {CleanTalkPredictionClient} from '../src/CleanTalkPredictionClient';
import {PredictRequest} from '../src/PredictRequest';
import {PredictResponse} from '../src/PredictResponse';
import {CleanTalkException} from '../src/Exception/CleanTalkException';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CleanTalkPredictionClient', () => {
    const TEST_TOKEN = 'token';

    let client: CleanTalkPredictionClient;
    let mockInstance: jest.Mocked<AxiosInstance>;

    beforeEach(() => {
        mockInstance = {
            post: jest.fn(),
        } as any;
        mockedAxios.create.mockReturnValue(mockInstance);
        client = new CleanTalkPredictionClient(TEST_TOKEN);
    });

    it('should throw if no accessToken is provided', async () => {
        const req = {getProjectId: () => 'id', getMessages: () => []} as unknown as PredictRequest;
        expect(() => new CleanTalkPredictionClient('')).toThrow(CleanTalkException);
    });

    it('should call httpClient.post and return PredictResponse for predict', async () => {
        const req = {getProjectId: () => 'id', getMessages: () => []} as unknown as PredictRequest;
        const mockResponse = {foo: 'bar'};
        mockInstance.post.mockResolvedValue({data: mockResponse});
        const fromObjectSpy = jest.spyOn(PredictResponse, 'fromObject').mockReturnValue({} as PredictResponse);
        const result = await client.predict(req);
        expect(mockInstance.post).toHaveBeenCalled();
        expect(fromObjectSpy).toHaveBeenCalledWith(mockResponse);
        expect(result).toBeInstanceOf(Object);
        fromObjectSpy.mockRestore();
    });

    it('should call httpClient.post for asyncPredict', async () => {
        const req = {getProjectId: () => 'id', getMessages: () => []} as unknown as PredictRequest;
        mockInstance.post.mockResolvedValue({});
        await expect(client.asyncPredict(req)).resolves.toBeUndefined();
        expect(mockInstance.post).toHaveBeenCalled();
    });

    it('should throw CleanTalkException on http error (predict)', async () => {
        const req = {getProjectId: () => 'id', getMessages: () => []} as unknown as PredictRequest;
        mockInstance.post.mockRejectedValue(new Error('fail'));
        await expect(client.predict(req)).rejects.toThrow(CleanTalkException);
    });

    it('should throw CleanTalkException on http error (asyncPredict)', async () => {
        const req = {getProjectId: () => 'id', getMessages: () => []} as unknown as PredictRequest;
        mockInstance.post.mockRejectedValue(new Error('fail'));
        await expect(client.asyncPredict(req)).rejects.toThrow(CleanTalkException);
    });
});

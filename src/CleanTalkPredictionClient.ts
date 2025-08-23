import axios, { AxiosInstance, AxiosError } from 'axios';
import { PredictRequest } from './PredictRequest';
import { PredictResponse } from './PredictResponse';
import { Message } from './Message';
import { CleanTalkException } from './Exception/CleanTalkException';
import RequestExceptionHandler from './RequestExceptionHandler';

interface ApiErrorResponse {
    errorCode?: string;
    message?: string;
    errors?: any[];
}

export class CleanTalkPredictionClient {
    private static BASE_URL = 'https://app.kolas.ai';
    private static SYNC_PREDICT_ENDPOINT = 'api/v1/predictions/predict';
    private static ASYNC_PREDICT_ENDPOINT = 'api/v1/predictions/asyncPredict';

    private httpClient: AxiosInstance;
    private accessToken: string;

    constructor(accessToken: string) {
        if (!accessToken) {
            throw new CleanTalkException('Not authorized. Call CleanTalkClient::auth() first.');
        }

        this.accessToken = accessToken;

        this.httpClient = axios.create({baseURL: CleanTalkPredictionClient.BASE_URL});
    }

    /**
     * Sends a synchronous prediction request to the Kolas.Ai API.
     */
    // @ts-ignore
    async predict(request: PredictRequest): Promise<PredictResponse> {
        try {
            const response = await this.httpClient.post(
                CleanTalkPredictionClient.SYNC_PREDICT_ENDPOINT,
                this.mapRequestToBody(request),
                {
                    headers: {
                        Authorization: this.getAuthorization(),
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            return PredictResponse.fromObject(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                RequestExceptionHandler.handle(error);
            }
            throw new CleanTalkException('Predict request failed: ' + (error as Error).message, error as Error);
        }
    }

    /**
     * Sends an asynchronous prediction request to the Kolas.Ai API.
     */
    // @ts-ignore
    async asyncPredict(request: PredictRequest): Promise<void> {
        try {
            await this.httpClient.post(
                CleanTalkPredictionClient.ASYNC_PREDICT_ENDPOINT,
                this.mapRequestToBody(request),
                {
                    headers: {
                        Authorization: this.getAuthorization(),
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                RequestExceptionHandler.handle(error);
            }
            throw new CleanTalkException('Async predict request failed: ' + (error as Error).message, error as Error);
        }
    }

    private mapRequestToBody(request: PredictRequest): object {
        return {
            projectId: request.getProjectId(),
            messages: request.getMessages().map((message: Message) => ({
                messageId: message.getMessageId(),
                message: message.getText(),
            })),
        };
    }

    private getAuthorization(): string {
        return `Bearer ${this.accessToken}`;
    }
}

export default CleanTalkPredictionClient;

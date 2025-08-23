import axios, { AxiosInstance, AxiosError } from 'axios';
import { PredictRequest } from './PredictRequest';
import { PredictResponse } from './PredictResponse';
import { Message } from './Message';
import { CleanTalkException } from './Exception/CleanTalkException';
import { AccountBalanceEmptyException } from './Exception/AccountBalanceEmptyException';
import { ProjectDatasetNotConfiguredException } from './Exception/ProjectDatasetNotConfiguredException';
import { ProjectNotActiveException } from './Exception/ProjectNotActiveException';
import { ProjectNotFoundException } from './Exception/ProjectNotFoundException';

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
        this.accessToken = accessToken;
        this.httpClient = axios.create({
            baseURL: CleanTalkPredictionClient.BASE_URL,
            timeout: 10000,
        });
    }

    /**
     * Sends a synchronous prediction request to the Kolas.Ai API.
     */
    // @ts-ignore
    async predict(request: PredictRequest): Promise<PredictResponse> {
        if (!this.accessToken) {
            throw new CleanTalkException('Not authorized. Call CleanTalkClient::auth() first.');
        }

        const body = {
            projectId: request.getProjectId(),
            messages: request.getMessages().map((message: Message) => ({
                messageId: message.getMessageId(),
                message: message.getText(),
            })),
        };

        try {
            const response = await this.httpClient.post(
                CleanTalkPredictionClient.SYNC_PREDICT_ENDPOINT,
                body,
                {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            return PredictResponse.fromObject(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleRequestException(error);
            }
            throw new CleanTalkException('Predict request failed: ' + (error as Error).message, error as Error);
        }
    }

    /**
     * Sends an asynchronous prediction request to the Kolas.Ai API.
     */
    // @ts-ignore
    async asyncPredict(request: PredictRequest): Promise<void> {
        if (!this.accessToken) {
            throw new CleanTalkException('Not authorized. Call CleanTalkClient::auth() first.');
        }

        const body = {
            projectId: request.getProjectId(),
            messages: request.getMessages().map((message: Message) => ({
                messageId: message.getMessageId(),
                message: message.getText(),
            })),
        };

        try {
            await this.httpClient.post(
                CleanTalkPredictionClient.ASYNC_PREDICT_ENDPOINT,
                body,
                {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleRequestException(error);
            }
            throw new CleanTalkException('Async predict request failed: ' + (error as Error).message, error as Error);
        }
    }

    /**
     * Handles HTTP request exceptions and throws appropriate custom exceptions.
     */
    private handleRequestException(error: AxiosError): never {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    throw new CleanTalkException('Unauthorized: Invalid access token.', error);
                case 422:
                    this.createException(error);
                case 500:
                    throw new CleanTalkException(
                        'Internal Server Error: Please try again later or contact technical support.',
                        error
                    );
                default:
                    throw new CleanTalkException(
                        'Predict request failed: ' + JSON.stringify(error.response.data),
                        error
                    );
            }
        }
        throw new CleanTalkException('Predict request failed: ' + error.message, error);
    }

    /**
     * Creates and throws specific exceptions based on API error codes.
     */
    private createException(error: AxiosError): never {
        const data = (error.response?.data as ApiErrorResponse) || {};
        const code = data.errorCode ?? '0';
        const message = data.message ?? 'Invalid request data.';
        const errors = data.errors ?? [];

        switch (code) {
            case ProjectNotFoundException.CODE:
                throw new ProjectNotFoundException(message);
            case ProjectDatasetNotConfiguredException.CODE:
                throw new ProjectDatasetNotConfiguredException(message);
            case ProjectNotActiveException.CODE:
                throw new ProjectNotActiveException(message);
            case AccountBalanceEmptyException.CODE:
                throw new AccountBalanceEmptyException(message);
            default:
                throw new CleanTalkException(
                    'Validation Error: ' + message + ' ' + JSON.stringify(errors),
                    error
                );
        }
    }
}

export default CleanTalkPredictionClient;

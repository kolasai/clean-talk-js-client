const fetch = require('node-fetch');
const CleanTalkException = require('./Exception/CleanTalkException');
const AccountBalanceEmptyException = require('./Exception/AccountBalanceEmptyException');
const ProjectDatasetNotConfiguredException = require('./Exception/ProjectDatasetNotConfiguredException');
const ProjectNotActiveException = require('./Exception/ProjectNotActiveException');
const ProjectNotFoundException = require('./Exception/ProjectNotFoundException');

class CleanTalkPredictionClient {
    static BASE_URL = 'https://app.kolas.ai';
    static SYNC_PREDICT_ENDPOINT = '/api/v1/predictions/predict';
    static ASYNC_PREDICT_ENDPOINT = '/api/v1/predictions/asyncPredict';

    /**
     * @param {string} accessToken
     */
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /**
     * Sends a synchronous prediction request to the Kolas.Ai API.
     * @param {PredictRequest} request
     * @returns {Promise<Object>} (should be PredictResponse)
     * @throws {CleanTalkException}
     */
    async predict(request) {
        if (!this.accessToken) {
            throw new CleanTalkException('Not authorized. Call CleanTalkClient::auth() first.');
        }

        const body = {
            projectId: request.getProjectId(),
            messages: request.getMessages().map(message => ({
                messageId: message.getMessageId(),
                message: message.getText(),
            })),
        };

        try {
            const response = await fetch(
                CleanTalkPredictionClient.BASE_URL + CleanTalkPredictionClient.SYNC_PREDICT_ENDPOINT,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                await this.handleRequestException(response);
            }

            const data = await response.json();
            // Replace with PredictResponse.fromObject(data) if implemented
            return data;
        } catch (e) {
            if (e instanceof CleanTalkException) throw e;
            throw new CleanTalkException('Predict request failed: ' + e.message);
        }
    }

    /**
     * Sends an asynchronous prediction request to the Kolas.Ai API.
     * @param {PredictRequest} request
     * @returns {Promise<void>}
     * @throws {CleanTalkException}
     */
    async asyncPredict(request) {
        if (!this.accessToken) {
            throw new CleanTalkException('Not authorized. Call CleanTalkClient::auth() first.');
        }

        const body = {
            projectId: request.getProjectId(),
            messages: request.getMessages().map(message => ({
                messageId: message.getMessageId(),
                message: message.getText(),
            })),
        };

        try {
            const response = await fetch(
                CleanTalkPredictionClient.BASE_URL + CleanTalkPredictionClient.ASYNC_PREDICT_ENDPOINT,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                await this.handleRequestException(response);
            }
        } catch (e) {
            if (e instanceof CleanTalkException) throw e;
            throw new CleanTalkException('Async predict request failed: ' + e.message);
        }
    }

    /**
     * Handles HTTP request exceptions and throws appropriate custom exceptions.
     * @param {Response} response
     * @throws {CleanTalkException}
     */
    async handleRequestException(response) {
        const status = response.status;
        let errorData = {};
        try {
            errorData = await response.json();
        } catch {
            errorData = { message: await response.text() };
        }
        switch (status) {
            case 401:
                throw new CleanTalkException('Unauthorized: Invalid access token.');
            case 422:
                this.createException(errorData);
                break;
            case 500:
                throw new CleanTalkException(
                    'Internal Server Error: Please try again later or contact technical support.'
                );
            default:
                throw new CleanTalkException(
                    'Predict request failed: ' + (errorData.message || JSON.stringify(errorData))
                );
        }
    }

    /**
     * Creates and throws specific exceptions based on API error codes.
     * @param {Object} errorData
     * @throws {AccountBalanceEmptyException|CleanTalkException|ProjectDatasetNotConfiguredException|ProjectNotActiveException|ProjectNotFoundException}
     */
    createException(errorData) {
        const code = errorData.errorCode || '0';
        const message = errorData.message || 'Invalid request data.';
        const errors = errorData.errors || [];

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
                    code
                );
        }
    }
}

module.exports = CleanTalkPredictionClient;


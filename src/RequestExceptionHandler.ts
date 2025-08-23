import { AxiosError } from 'axios';
import { CleanTalkException } from './Exception/CleanTalkException';
import { AccountBalanceEmptyException } from './Exception/AccountBalanceEmptyException';
import { ProjectDatasetNotConfiguredException } from './Exception/ProjectDatasetNotConfiguredException';
import { ProjectNotActiveException } from './Exception/ProjectNotActiveException';
import { ProjectNotFoundException } from './Exception/ProjectNotFoundException';
import {
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_UNPROCESSABLE_ENTITY,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} from './httpStatusCodes';

interface ApiErrorResponse {
    errorCode?: string;
    message?: string;
    errors?: any[];
}

export class RequestExceptionHandler {
    static handle(error: AxiosError): never {
        if (error.response) {
            switch (error.response.status) {
                case HTTP_STATUS_UNAUTHORIZED:
                    throw new CleanTalkException('Unauthorized: Invalid access token.', error);
                case HTTP_STATUS_UNPROCESSABLE_ENTITY:
                    this.createException(error);
                case HTTP_STATUS_INTERNAL_SERVER_ERROR:
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

    private static createException(error: AxiosError): never {
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

export default RequestExceptionHandler;

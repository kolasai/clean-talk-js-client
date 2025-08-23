import {AxiosError} from 'axios';
import RequestExceptionHandler from '../src/RequestExceptionHandler';
import {CleanTalkException} from '../src/Exception/CleanTalkException';
import {ProjectNotFoundException} from '../src/Exception/ProjectNotFoundException';
import {ProjectDatasetNotConfiguredException} from '../src/Exception/ProjectDatasetNotConfiguredException';
import {ProjectNotActiveException} from '../src/Exception/ProjectNotActiveException';
import {AccountBalanceEmptyException} from '../src/Exception/AccountBalanceEmptyException';
import {
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_UNPROCESSABLE_ENTITY,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} from '../src/httpStatusCodes';

describe('RequestExceptionHandler', () => {
    function makeAxiosError(status: number, data: any = {}) {
        return {
            isAxiosError: true,
            response: {status, data},
            message: 'error',
            config: {},
            toJSON: () => ({}),
            name: 'AxiosError',
        } as unknown as AxiosError;
    }

    it('throws CleanTalkException for 401', () => {
        const error = makeAxiosError(HTTP_STATUS_UNAUTHORIZED);
        expect(() => RequestExceptionHandler.handle(error)).toThrow(CleanTalkException);
        expect(() => RequestExceptionHandler.handle(error)).toThrow('Unauthorized: Invalid access token.');
    });

    it('throws CleanTalkException for 500', () => {
        const error = makeAxiosError(HTTP_STATUS_INTERNAL_SERVER_ERROR);
        expect(() => RequestExceptionHandler.handle(error)).toThrow(CleanTalkException);
        expect(() => RequestExceptionHandler.handle(error)).toThrow('Internal Server Error: Please try again later or contact technical support.');
    });

    it('throws CleanTalkException for unknown status', () => {
        const error = makeAxiosError(HTTP_STATUS_NOT_FOUND, {foo: 'bar'});
        expect(() => RequestExceptionHandler.handle(error)).toThrow(CleanTalkException);
        expect(() => RequestExceptionHandler.handle(error)).toThrow('Predict request failed: {"foo":"bar"}');
    });

    it('throws CleanTalkException for no response', () => {
        const error = {
            isAxiosError: true,
            message: 'no response',
            config: {},
            toJSON: () => ({}),
            name: 'AxiosError'
        } as unknown as AxiosError;
        expect(() => RequestExceptionHandler.handle(error)).toThrow(CleanTalkException);
        expect(() => RequestExceptionHandler.handle(error)).toThrow('Predict request failed: no response');
    });

    describe('422 error code mapping', () => {
        function make422(code: string, message = 'msg', errors: any[] = []) {
            return makeAxiosError(HTTP_STATUS_UNPROCESSABLE_ENTITY, {errorCode: code, message, errors});
        }

        it('throws ProjectNotFoundException', () => {
            const error = make422(ProjectNotFoundException.CODE, 'not found');
            expect(() => RequestExceptionHandler.handle(error)).toThrow(ProjectNotFoundException);
            expect(() => RequestExceptionHandler.handle(error)).toThrow('not found');
        });
        it('throws ProjectDatasetNotConfiguredException', () => {
            const error = make422(ProjectDatasetNotConfiguredException.CODE, 'not configured');
            expect(() => RequestExceptionHandler.handle(error)).toThrow(ProjectDatasetNotConfiguredException);
            expect(() => RequestExceptionHandler.handle(error)).toThrow('not configured');
        });
        it('throws ProjectNotActiveException', () => {
            const error = make422(ProjectNotActiveException.CODE, 'not active');
            expect(() => RequestExceptionHandler.handle(error)).toThrow(ProjectNotActiveException);
            expect(() => RequestExceptionHandler.handle(error)).toThrow('not active');
        });
        it('throws AccountBalanceEmptyException', () => {
            const error = make422(AccountBalanceEmptyException.CODE, 'balance empty');
            expect(() => RequestExceptionHandler.handle(error)).toThrow(AccountBalanceEmptyException);
            expect(() => RequestExceptionHandler.handle(error)).toThrow('balance empty');
        });
        it('throws CleanTalkException for unknown code', () => {
            const error = make422('unknown', 'validation failed', [{field: 'x'}]);
            expect(() => RequestExceptionHandler.handle(error)).toThrow(CleanTalkException);
            expect(() => RequestExceptionHandler.handle(error)).toThrow('Validation Error: validation failed [{"field":"x"}]');
        });
    });
});

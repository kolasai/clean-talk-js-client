import AuthResult from '../src/AuthResult';
import {CleanTalkException} from '../src/Exception/CleanTalkException';

describe('AuthResult', () => {
    const validData = {
        access_token: 'token123',
        token_type: 'Bearer',
        expires_in: '3600'
    };

    it('should create an instance from valid data', () => {
        const result = AuthResult.fromObject(validData);
        expect(result).toBeInstanceOf(AuthResult);
        expect(result.getAccessToken()).toBe(validData.access_token);
        expect(result.getTokenType()).toBe(validData.token_type);
        expect(result.getExpiresIn()).toBe(validData.expires_in);
    });

    it('should throw if access_token is missing', () => {
        const {access_token, ...data} = validData;
        expect(() => AuthResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if token_type is missing', () => {
        const {token_type, ...data} = validData;
        expect(() => AuthResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if expires_in is missing', () => {
        const {expires_in, ...data} = validData;
        expect(() => AuthResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if all fields are missing', () => {
        expect(() => AuthResult.fromObject({})).toThrow(CleanTalkException);
    });
});


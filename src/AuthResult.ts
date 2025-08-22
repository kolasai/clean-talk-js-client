import { CleanTalkException } from './Exception/CleanTalkException';

export class AuthResult {
    private accessToken: string;
    private tokenType: string;
    private expiresIn: string;

    private constructor(accessToken: string, tokenType: string, expiresIn: string) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
    }

    static fromObject(data: { [key: string]: any }): AuthResult {
        if (!data['access_token'] || !data['token_type'] || !data['expires_in']) {
            throw new CleanTalkException('Invalid data for AuthResult');
        }
        return new AuthResult(data['access_token'], data['token_type'], data['expires_in']);
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    getExpiresIn(): string {
        return this.expiresIn;
    }

    getTokenType(): string {
        return this.tokenType;
    }
}

export default AuthResult;

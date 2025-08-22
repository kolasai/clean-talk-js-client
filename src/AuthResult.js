const CleanTalkException = require('./Exception/CleanTalkException');

class AuthResult {
    /**
     * @param {Object} data
     * @returns {AuthResult}
     */
    static fromObject(data) {
        if (!data.access_token || !data.token_type || !data.expires_in) {
            throw new CleanTalkException('Invalid data for AuthResult');
        }
        const obj = new AuthResult();
        obj.accessToken = data.access_token;
        obj.tokenType = data.token_type;
        obj.expiresIn = data.expires_in;
        return obj;
    }

    getAccessToken() {
        return this.accessToken;
    }

    getExpiresIn() {
        return this.expiresIn;
    }

    getTokenType() {
        return this.tokenType;
    }
}

module.exports = AuthResult;

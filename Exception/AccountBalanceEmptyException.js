const CleanTalkException = require('./CleanTalkException');

class AccountBalanceEmptyException extends CleanTalkException {
    static CODE = 'ACCOUNT_BALANCE_EMPTY';

    constructor(message) {
        super(message);
        this.name = 'AccountBalanceEmptyException';
        this.code = AccountBalanceEmptyException.CODE;
    }
}

module.exports = AccountBalanceEmptyException;


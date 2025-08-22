import { CleanTalkException } from './CleanTalkException';

export class AccountBalanceEmptyException extends CleanTalkException {
    static CODE = 'ACCOUNT_BALANCE_EMPTY';

    constructor(message: string, previous?: Error) {
        super(message, previous);
    }
}

export default AccountBalanceEmptyException;

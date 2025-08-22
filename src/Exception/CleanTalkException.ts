export class CleanTalkException extends Error {
    previous?: Error;

    constructor(message: string, previous?: Error) {
        super(message);
        this.name = 'CleanTalkException';
        this.previous = previous;
    }
}

export default CleanTalkException;

class CleanTalkException extends Error {
    constructor(message) {
        super(message);
        this.name = 'CleanTalkException';
    }
}

module.exports = CleanTalkException;


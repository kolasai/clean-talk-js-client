const CleanTalkException = require('./CleanTalkException');

class ProjectNotActiveException extends CleanTalkException {
    static CODE = 'PROJECT_NOT_ACTIVE';

    constructor(message) {
        super(message);
        this.name = 'ProjectNotActiveException';
        this.code = ProjectNotActiveException.CODE;
    }
}

module.exports = ProjectNotActiveException;


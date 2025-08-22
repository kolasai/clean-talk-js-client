const CleanTalkException = require('./CleanTalkException');

class ProjectNotFoundException extends CleanTalkException {
    static CODE = 'PROJECT_NOT_FOUND';

    constructor(message) {
        super(message);
        this.name = 'ProjectNotFoundException';
        this.code = ProjectNotFoundException.CODE;
    }
}

module.exports = ProjectNotFoundException;


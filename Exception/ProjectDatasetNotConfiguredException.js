const CleanTalkException = require('./CleanTalkException');

class ProjectDatasetNotConfiguredException extends CleanTalkException {
    static CODE = 'PROJECT_DATASET_NOT_CONFIGURED';

    constructor(message) {
        super(message);
        this.name = 'ProjectDatasetNotConfiguredException';
        this.code = ProjectDatasetNotConfiguredException.CODE;
    }
}

module.exports = ProjectDatasetNotConfiguredException;


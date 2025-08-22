import { CleanTalkException } from './CleanTalkException';

export class ProjectDatasetNotConfiguredException extends CleanTalkException {
    static CODE = 'PROJECT_DATASET_NOT_CONFIGURED';

    constructor(message: string, previous?: Error) {
        super(message, previous);
    }
}

export default ProjectDatasetNotConfiguredException;

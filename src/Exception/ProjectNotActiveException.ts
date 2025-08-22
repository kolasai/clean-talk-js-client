import { CleanTalkException } from './CleanTalkException';

export class ProjectNotActiveException extends CleanTalkException {
    static CODE = 'PROJECT_NOT_ACTIVE';

    constructor(message: string, previous?: Error) {
        super(message, previous);
    }
}

export default ProjectNotActiveException;

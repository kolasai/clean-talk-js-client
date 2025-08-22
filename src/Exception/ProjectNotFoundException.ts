import {CleanTalkException} from './CleanTalkException';

export class ProjectNotFoundException extends CleanTalkException {
    static CODE = 'PROJECT_NOT_FOUND';

    constructor(message: string, previous?: Error) {
        super(message, previous);
    }
}

export default ProjectNotFoundException;

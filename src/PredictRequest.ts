import { Message } from './Message';

export class PredictRequest {
    private projectId: string;
    private messages: Message[];

    constructor(projectId: string, messages: Message[]) {
        this.projectId = projectId;
        this.messages = messages;
    }

    getProjectId(): string {
        return this.projectId;
    }

    getMessages(): Message[] {
        return this.messages;
    }
}

export default PredictRequest;

import CleanTalkException from './Exception/CleanTalkException';

export class Message {
    private messageId: string;
    private text: string;

    /**
     * @param messageId Unique identifier for the message.
     * @param text The content of the message.
     * @throws CleanTalkException If the message ID or text is empty.
     */
    constructor(messageId: string, text: string) {
        if (!messageId) {
            throw new CleanTalkException('Message ID cannot be empty.');
        }
        if (!text) {
            throw new CleanTalkException('Message text cannot be empty.');
        }
        this.messageId = messageId;
        this.text = text;
    }

    getMessageId(): string {
        return this.messageId;
    }

    getText(): string {
        return this.text;
    }
}

export default Message;

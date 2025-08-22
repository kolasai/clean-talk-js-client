class Message {
    /**
     * @param {string} messageId
     * @param {string} text
     */
    constructor(messageId, text) {
        if (!messageId) {
            throw new Error('Message ID cannot be empty.');
        }
        if (!text) {
            throw new Error('Message text cannot be empty.');
        }
        this.messageId = messageId;
        this.text = text;
    }

    getMessageId() {
        return this.messageId;
    }

    getText() {
        return this.text;
    }
}

module.exports = Message;


class PredictRequest {
    /**
     * @param {string} projectId
     * @param {Array} messages
     */
    constructor(projectId, messages) {
        this.projectId = projectId;
        this.messages = messages;
    }

    getMessages() {
        return this.messages;
    }

    getProjectId() {
        return this.projectId;
    }
}

module.exports = PredictRequest;

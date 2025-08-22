class PredictionResult {
    /**
     * @param {Object} data
     * @returns {PredictionResult}
     */
    static fromObject(data) {
        if (
            !data.messageId ||
            !data.message ||
            !data.prediction ||
            typeof data.probability === 'undefined' ||
            !data.categories
        ) {
            throw new Error('Invalid data for PredictionResult');
        }
        const obj = new PredictionResult();
        obj.messageId = data.messageId;
        obj.message = data.message;
        obj.categories = Array.isArray(data.categories) ? data.categories : [data.categories];
        obj.prediction = data.prediction;
        obj.probability = parseFloat(data.probability);
        return obj;
    }

    getCategories() {
        return this.categories;
    }

    getMessage() {
        return this.message;
    }

    getMessageId() {
        return this.messageId;
    }

    getPrediction() {
        return this.prediction;
    }

    getProbability() {
        return this.probability;
    }
}

module.exports = PredictionResult;


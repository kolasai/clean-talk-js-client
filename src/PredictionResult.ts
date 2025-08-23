import { CleanTalkException } from './Exception/CleanTalkException';

export class PredictionResult {
    private messageId: string;
    private categories: string[];
    private prediction: string;
    private probability: number;
    private message: string;

    private constructor(
        messageId: string,
        message: string,
        categories: string[],
        prediction: string,
        probability: number
    ) {
        this.messageId = messageId;
        this.message = message;
        this.categories = categories;
        this.prediction = prediction;
        this.probability = probability;
    }

    /**
     * Create a PredictionResult instance from a plain object.
     * @param data
     * @throws CleanTalkException
     */
    static fromObject(data: { [key: string]: any }): PredictionResult {
        if (
            !data['messageId'] ||
            !data['message'] ||
            !data['prediction'] ||
            !data['probability'] ||
            !data['categories']
        ) {
            throw new CleanTalkException('Invalid data for PredictionResult');
        }

        return new PredictionResult(
            data['messageId'],
            data['message'],
            Array.isArray(data['categories']) ? data['categories'] : [data['categories']],
            data['prediction'],
            Number(data['probability'])
        );
    }

    getCategories(): string[] {
        return this.categories;
    }

    getMessage(): string {
        return this.message;
    }

    getMessageId(): string {
        return this.messageId;
    }

    getPrediction(): string {
        return this.prediction;
    }

    getProbability(): number {
        return this.probability;
    }
}

export default PredictionResult;

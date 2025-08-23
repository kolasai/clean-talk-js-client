import { PredictionResult } from './PredictionResult';
import CleanTalkException from "./Exception/CleanTalkException";

export class PredictResponse {
    private predictions: PredictionResult[] = [];

    /**
     * Creates an instance of PredictResponse from a plain object.
     * @param data
     * @throws CleanTalkException
     */
    static fromObject(data: { [key: string]: any }): PredictResponse {
        if (data['predictions'] && Array.isArray(data['predictions'])) {
            const self = new PredictResponse();

            for (const item of data['predictions']) {
                self.predictions.push(PredictionResult.fromObject(item));
            }
            return self;
        } else {
            throw new CleanTalkException('Predictions cannot be empty and must be an array');
        }
    }

    getPredictions(): PredictionResult[] {
        return this.predictions;
    }
}


import { PredictionResult } from './PredictionResult';

export class PredictResponse {
    private predictions: PredictionResult[] = [];

    /**
     * Creates an instance of PredictResponse from a plain object.
     * @param data
     * @throws CleanTalkException
     */
    static fromObject(data: { [key: string]: any }): PredictResponse {
        const self = new PredictResponse();
        if (data['predictions'] && Array.isArray(data['predictions'])) {
            for (const item of data['predictions']) {
                self.predictions.push(PredictionResult.fromObject(item));
            }
        }
        return self;
    }

    getPredictions(): PredictionResult[] {
        return this.predictions;
    }
}


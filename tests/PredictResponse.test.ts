import {PredictResponse} from '../src/PredictResponse';
import {PredictionResult} from '../src/PredictionResult';

describe('PredictResponse', () => {
    it('should create an instance from a valid object', () => {
        const mockPrediction = {foo: 'bar'};
        const fromObjectSpy = jest.spyOn(PredictionResult, 'fromObject').mockReturnValue({} as PredictionResult);
        const data = {predictions: [mockPrediction]};
        const response = PredictResponse.fromObject(data);

        expect(response).toBeInstanceOf(PredictResponse);
        expect(fromObjectSpy).toHaveBeenCalledWith(mockPrediction);

        fromObjectSpy.mockRestore();
    });

    it('should throw CleanTalkException if predictions is missing', () => {
        const data = {};
        expect(() => PredictResponse.fromObject(data)).toThrow('Predictions cannot be empty and must be an array');
    });

    it('should throw CleanTalkException if predictions is not an array', () => {
        const data = {predictions: 'not-an-array'};
        expect(() => PredictResponse.fromObject(data)).toThrow('Predictions cannot be empty and must be an array');
    });

    it('should throw CleanTalkException if predictions is null', () => {
        const data = {predictions: null};
        expect(() => PredictResponse.fromObject(data)).toThrow('Predictions cannot be empty and must be an array');
    });

    it('should return predictions array', () => {
        const mockPredictionResult = {} as PredictionResult;
        const fromObjectSpy = jest.spyOn(PredictionResult, 'fromObject').mockReturnValue(mockPredictionResult);
        const data = {predictions: [{foo: 'bar'}]};
        const response = PredictResponse.fromObject(data);

        expect(response.getPredictions()).toEqual([mockPredictionResult]);

        fromObjectSpy.mockRestore();
    });
});

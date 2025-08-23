import PredictionResult from '../src/PredictionResult';
import {CleanTalkException} from '../src/Exception/CleanTalkException';

describe('PredictionResult.fromObject', () => {
    const validData = {
        messageId: 'id-1',
        message: 'test message',
        categories: ['spam', 'ham'],
        prediction: 'spam',
        probability: 0.99
    };

    it('should create an instance from valid data', () => {
        const result = PredictionResult.fromObject(validData);
        expect(result).toBeInstanceOf(PredictionResult);
        expect(result.getMessageId()).toBe(validData.messageId);
        expect(result.getMessage()).toBe(validData.message);
        expect(result.getCategories()).toEqual(validData.categories);
        expect(result.getPrediction()).toBe(validData.prediction);
        expect(result.getProbability()).toBe(validData.probability);
    });

    it('should throw if messageId is missing', () => {
        const {messageId, ...data} = validData;
        expect(() => PredictionResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if message is missing', () => {
        const {message, ...data} = validData;
        expect(() => PredictionResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if prediction is missing', () => {
        const {prediction, ...data} = validData;
        expect(() => PredictionResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if probability is missing', () => {
        const {probability, ...data} = validData;
        expect(() => PredictionResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should throw if categories is missing', () => {
        const {categories, ...data} = validData;
        expect(() => PredictionResult.fromObject(data)).toThrow(CleanTalkException);
    });

    it('should accept categories as a single string', () => {
        const data = {...validData, categories: 'spam'};
        const result = PredictionResult.fromObject(data);
        expect(result.getCategories()).toEqual(['spam']);
    });

    it('should convert probability string to number', () => {
        const data = {...validData, probability: '0.5'};
        const result = PredictionResult.fromObject(data);
        expect(result.getProbability()).toBeCloseTo(0.5);
    });
});

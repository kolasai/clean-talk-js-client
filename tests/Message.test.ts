import Message from '../src/Message';
import CleanTalkException from '../src/Exception/CleanTalkException';

describe('Message', () => {
    it('should create a Message instance with valid messageId and text', () => {
        const msg = new Message('id-123', 'Hello world!');
        expect(msg).toBeInstanceOf(Message);
        expect(msg.getMessageId()).toBe('id-123');
        expect(msg.getText()).toBe('Hello world!');
    });

    it('should throw CleanTalkException if messageId is empty', () => {
        expect(() => new Message('', 'Hello')).toThrow(CleanTalkException);
        expect(() => new Message('', 'Hello')).toThrow('Message ID cannot be empty.');
    });

    it('should throw CleanTalkException if text is empty', () => {
        expect(() => new Message('id-123', '')).toThrow(CleanTalkException);
        expect(() => new Message('id-123', '')).toThrow('Message text cannot be empty.');
    });

    it('should throw CleanTalkException if both messageId and text are empty', () => {
        expect(() => new Message('', '')).toThrow(CleanTalkException);
        expect(() => new Message('', '')).toThrow('Message ID cannot be empty.');
    });
});


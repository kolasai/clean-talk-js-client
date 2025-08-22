const KolasAiOAuthClient = require('./KolasAiOAuthClient');
const CleanTalkPredictionClient = require('./CleanTalkPredictionClient');
const Message = require('./Message');
const PredictRequest = require('./PredictRequest');

const YOUR_PROJECT_ID = '11';
const YOUR_CLIENT_ID = '4';
const YOUR_CLIENT_SECRET = 'zYFtjzSv2JKvAE6cjojxuGyjcYsAi6Fxmiv4rrjF';

(async () => {
    try {
        const oauthClient = new KolasAiOAuthClient();
        const authResult = await oauthClient.auth(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET);

        const client = new CleanTalkPredictionClient(authResult.getAccessToken());
        const response = await client.predict(
            new PredictRequest(
                YOUR_PROJECT_ID,
                [
                    new Message('11177c92-1266-4817-ace5-cda430481111', 'Hello world!'),
                    new Message('22277c92-1266-4817-ace5-cda430482222', 'Good buy world!'),
                ]
            )
        );

        // If you have a PredictionResult class with fromObject, adapt this section accordingly
        if (response.predictions) {
            for (const prediction of response.predictions) {
                console.log(`MessageId: ${prediction.messageId}`);
                console.log(`Message: ${prediction.message}`);
                console.log(`Prediction: ${prediction.prediction}`);
                console.log(`Probability: ${prediction.probability}`);
                console.log(`Categories: ${Array.isArray(prediction.categories) ? prediction.categories.join(', ') : prediction.categories}`);
            }
        }

        await client.asyncPredict(new PredictRequest(
            YOUR_PROJECT_ID,
            [
                new Message('11177c92-1266-4817-ace5-cda430483333', 'Hello world!'),
                new Message('22277c92-1266-4817-ace5-cda430484444', 'Good buy world!'),
            ]
        ));
    } catch (e) {
        console.error(e);
    }
})();


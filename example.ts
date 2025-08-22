import KolasAiOAuthClient from './src/KolasAiOAuthClient';
import CleanTalkPredictionClient from './src/CleanTalkPredictionClient';
import PredictRequest from './src/PredictRequest';
import Message from './src/Message';

const YOUR_PROJECT_ID = '11';
const YOUR_CLIENT_ID = '4';
const YOUR_CLIENT_SECRET = 'zYFtjzSv2JKvAE6cjojxuGyjcYsAi6Fxmiv4rrjF';

// @ts-ignore
async function main() {
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

    for (const prediction of response.getPredictions()) {
        console.log(`MessageId: ${prediction.getMessageId()}`);
        console.log(`Message: ${prediction.getMessage()}`);
        console.log(`Prediction: ${prediction.getPrediction()}`);
        console.log(`Probability: ${prediction.getProbability()}`);
        console.log(`Categories: ${prediction.getCategories().join(', ')}`);
    }

    await client.asyncPredict(new PredictRequest(
        YOUR_PROJECT_ID,
        [
            new Message('11177c92-1266-4817-ace5-cda430483333', 'Hello world!'),
            new Message('22277c92-1266-4817-ace5-cda430484444', 'Good buy world!'),
        ]
    ));
}

main().catch(e => {
    console.error(e);
});

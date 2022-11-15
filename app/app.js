import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import middlewares from './middlewares';
import errorHandler from './errorHandler';

const app = express();

app.use(bodyParser.json({ limit: '2mb' }));
middlewares(app);
routes(app);
errorHandler(app);

export default app;

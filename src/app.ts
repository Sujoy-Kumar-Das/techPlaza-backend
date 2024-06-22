import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandeler';
import notFoundErrorHandler from './app/middleware/not-found';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());
// application routes
app.use(router);

// applications error handler middlewares
app.use(globalErrorHandler);
app.use(notFoundErrorHandler);

export default app;

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { v1Router } from './api/v1';
import { DBService } from '../typeorm/db.service';

DBService.init();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1', v1Router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`[Server]: Listening on http://localhost:${port}`);
});

export { app };

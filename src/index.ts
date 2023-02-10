import express, { Express, Request, Response } from 'express';
import { errorHandling } from './middleware/errorHandling.middleware';

import router from './router';
import {wrap} from 'async-middleware'


const app: Express = express();
let port = process.env.PORT || 3000;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', router);

app.use(errorHandling);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
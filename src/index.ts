import express, { Express, Request, Response } from 'express';
import { errorHandling } from './middleware/errorHandling.middleware';

import router from './router';
import bodyParser from 'body-parser';



const app: Express = express();
let port = process.env.PORT || 3002;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);
app.use(errorHandling);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
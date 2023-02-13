import { Request, Response, Router } from 'express';
const router = Router();

const test = (req: Request, res: Response) => {
    res.json({ message: 'test' });
  };

const promiseTest = (req: Request, res: Response) => {
    return new Promise((resolve) => {
        resolve('this is an asnyc test')
        res.send({message:'this is a promise test'});
      })
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncTest = async (req: Request, res: Response) => {
  await sleep(10);
  res.send({message: 'this is an async test'})
};

router.get('/test', test);
router.get('/test2', asyncTest);
router.get('/test3', promiseTest);

export {router};
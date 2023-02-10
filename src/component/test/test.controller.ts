import { Request, Response } from 'express';


const test = (req: Request, res: Response) => {
    res.send({ message: 'test' });
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

export {test, asyncTest, promiseTest};
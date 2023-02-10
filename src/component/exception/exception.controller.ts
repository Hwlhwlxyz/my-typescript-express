import { wrap } from 'async-middleware';
import { Request, Response } from 'express';


const throwError = (req: Request, res: Response) => {
    throw "throw an error";
    res.send({ message: 'Created' });
  };

const promiseThrowError = wrap((req: Request, res: Response) => {
    console.log(req, res);
    return new Promise(() => {
        throw new Error('this is an async error')
      })
});

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncThrowError = wrap(async (req, res) => {
    console.log(req, res);
    await sleep(10);
    throw "async throw error"
    return '0';
});

export {throwError, asyncThrowError};
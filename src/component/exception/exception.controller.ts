import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';

const router = Router();


const throwError = (req: Request, res: Response) => {
    throw "throw an error";
    res.send({ message: 'Created' });
};
router.get('/throwError', throwError);

const promiseThrowError = wrap((req: Request, res: Response) => {
    console.log(req, res);
    return new Promise(() => {
        throw new Error('promiseThrowError: this is an async error')
    })
});
router.get('/promiseThrowError', promiseThrowError);

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncThrowError = wrap(async (req, res) => {
    console.log(req, res);
    await sleep(10);
    throw "async throw error"
    return '0';
});
router.get('/asyncThrowError', asyncThrowError);

export { throwError, asyncThrowError, router };
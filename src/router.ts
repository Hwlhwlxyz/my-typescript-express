import { Router } from 'express';
import { asyncThrowError, throwError} from './component/exception/exception.controller';
import { asyncTest, promiseTest, test } from './component/test/test.controller';

const router: Router = Router();

const exceptionRouter = Router();
exceptionRouter.get('/exception', throwError);
exceptionRouter.get('/exception2', asyncThrowError);

const testRouter = Router();
testRouter.get('/test', test);
testRouter.get('/test2', asyncTest);
testRouter.get('/test3', promiseTest);

router.use('/exception', exceptionRouter);
router.use('/test', testRouter);

export default router;
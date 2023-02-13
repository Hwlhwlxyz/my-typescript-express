import { Router } from 'express';
import { router as testRouter } from './component/test/test.controller';
import { router as exceptionRouter } from './component/exception/exception.controller';
import { createLog, logResponseBody, responseLogger, traceMiddleware } from './middleware/logger.middleware';

const router: Router = Router();
router.use(createLog);
router.use(traceMiddleware);
router.use(logResponseBody);
router.use(responseLogger);

router.use('/test', testRouter);
router.use('/exception', exceptionRouter);

export default router;
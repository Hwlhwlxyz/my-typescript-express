import { Request, Response, NextFunction, RequestHandler, response } from 'express';

const createLog = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
        console.log("createLog:", req.method, decodeURI(req.url), res.statusCode, res.statusMessage);

    })
    next();
};

// https://stackoverflow.com/a/58882269
function logResponseBody(req: Request, res: Response, next: NextFunction) {
    const [oldWrite, oldEnd] = [res.write, res.end];
    const chunks: Buffer[] = [];

    (res.write as unknown) = function (chunk: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) {
        chunks.push(Buffer.from(chunk));
        (oldWrite as Function).apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) {
            chunks.push(Buffer.from(chunk));
        }
        const body = Buffer.concat(chunks).toString('utf8');
        console.log("logResponseBody:", new Date(), `  ↪ [${res.statusCode}]: ${body}`);
        (oldEnd as Function).apply(res, arguments);
        return response;
    };
    if (next) {
        next();
    }
}

// https://stackoverflow.com/a/68498226
const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const buffers: any[] = [];
    const proxyHandler = {
        apply(target: any, thisArg: any, argumentsList: any[]) {
            const contentType = res.getHeader('content-type')

            buffers.push(argumentsList[0])

            return target.call(thisArg, ...argumentsList)
        }
    }
    res.write = new Proxy(res.write, proxyHandler)
    res.end = new Proxy(res.end, proxyHandler)
    res.on('finish', () => {
        // tracing logic inside
        // console.log("traceMiddleware:", Buffer.concat(buffers).toString('utf8'))
        console.log("traceMiddleware:", buffers)
    })
    next()
}

// https://stackoverflow.com/a/68687930
function responseLogger(req: Request, res: Response, next: NextFunction) {
    const originalSendFunc = res.send.bind(res);
    res.send = function (body) {
        console.log("responseLogger:", body);    // do whatever here
        return originalSendFunc(body);
    };
    next();
}


export { createLog, traceMiddleware, logResponseBody, responseLogger };
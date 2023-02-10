import { Request, Response, NextFunction, RequestHandler } from 'express';


const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('handler error...');
  console.log(err);
  // next(err);
  if (err!=null) {
    res.json({
      error: "err"
    })
  }
  else {
    next();
  }
  
}

export {errorHandling}
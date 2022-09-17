import { Request, Response } from 'express';
import errorCodes from '../error-codes';
import logger from '../logger';

const handleError = (err: any, _req: Request, res: Response, _next: any) => {
  let { message } = err;
  const status = err.status || errorCodes.notFound;
  
  logger.error(err.stack);

  if (status === errorCodes.notFound) {
    message = 'Not Found'
  }

  res.status(status);
  res.json({ error: message });
};

export default handleError;

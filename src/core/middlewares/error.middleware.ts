import CustomError, { ApiKeyError, ApiOrmError, TokenError } from '../custom-error';
import { Request, Response, NextFunction } from 'express';
import { getIp } from '../utils';

const errorMiddleware = (err: any, req: Request | any, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    if (err instanceof CustomError) {
        const message = err.message || 'Internal Server Error';
        console.log(`${err.statusCode} - ${err.message}  - ${req.originalUrl} - ${req.method} - ${getIp(req)} - email: ${req.user?.email}`,);
        if (err instanceof ApiOrmError) {
            console.log(err.error);
        } else if (err instanceof TokenError) {
            console.log(err.token);
        } else if (err instanceof ApiKeyError) {
            console.log(err.apiKey);
        }
        console.log(err.stack);
        res.status(statusCode).json({ status: 'error', statusCode, message, });

    } else {
        console.log(`$500 - ${err.message}  - ${req.originalUrl} - ${req.method} - ${getIp(req)} - email: ${req.user?.email}`,);
        console.log(err);
        res.status(500).json({ status: 'error', statusCode: 500, message: "Ouf !! An error occurred. Please contact admin if that persist" });
    }
};


export default errorMiddleware;

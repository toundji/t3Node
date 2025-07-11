import { plainToClass, plainToInstance } from 'class-transformer';
import { validate, validateSync, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

function bodyValidationMid<T>(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: ValidationError[] = validateSync(plainToInstance(type, req.body));
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            next();
        }
    };
}

function paramValidationMid<T>(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: ValidationError[] = validateSync(plainToInstance(type, req.params));
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            next();
        }
    };
}

function paramBodyValidationMid<T, Q>(params: any, body: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const errorsParam: ValidationError[] = validateSync(plainToInstance(params, req.params));
        const errorsBody: ValidationError[] = validateSync(plainToInstance(body, req.body));
        const errors = { ...errorsParam, ...errorsBody };
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            next();
        }
    };
}

export default {
    bodyValidationMid,
    paramValidationMid,
    paramBodyValidationMid

};

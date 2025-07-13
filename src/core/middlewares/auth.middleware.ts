import { ApiKeyError, ErrorType, ForbiddenError, TokenError } from "../../core/custom-error";
import { getIp } from "../utils";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

export const deserialization = (req: Request | any, res: Response, next: NextFunction) => {
    const auth: any = {};
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        auth.logged = false;
        auth.type = ErrorType.BAD_TOKEN;
        auth.message = !bearer || bearer =='' ? 'Authentication token not defined' : 'Authentication token badly formatted';
        req.auth = auth;
        return next();
    }


    const token = bearer.split(' ')[1];

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET ?? '');
        auth.logged = true;
        req.user = decodedToken.payload;
    } catch (error: any) {
        auth.logged = false;
        auth.token = token;

        if (error instanceof TokenExpiredError) {
            auth.type = ErrorType.TOKEN_EXPIRED;
            auth.message = 'Session has expired';
        } else if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
            auth.type = ErrorType.BAD_TOKEN;
            auth.message = 'Invalid token';
        } else {
            auth.type = ErrorType.BAD_TOKEN;
            auth.message = 'An unknown error occurred while verifying token';
        }
    }

    req.auth = auth;
    next();
};


export const apiKeyVerification = (req: Request | any, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        if (req.originalUrl === "/docs") {
            next();
            return;
        }
        throw new ApiKeyError(apiKey);
    }
    next();
};


export const requirePermission = (...allowedRoles: string[]) => {
    return (req: Request | any, res: Response, next: NextFunction) => {
        const user = req?.user;
        if (!user) {
            throw new TokenError({ token: req.auth?.token, type: req.auth?.type }, req.auth?.message)
        }
        if (!allowedRoles.includes(user.role)) {
            throw new ForbiddenError();
        }

        next();
    };
};


const auth = (req: Request | any, res: Response, next: NextFunction) => {
    const auth = req.auth;
    if (auth?.logged === true) {
        if (req.user?.status === true) {
            next();
        } else { throw new ForbiddenError("Account blocked") }
    } else {
        throw new TokenError({ token: auth?.token, type: auth?.type }, auth?.message)
    }
};


export default auth;
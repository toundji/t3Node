

export enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
}


export enum StatusCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}


class CustomError extends Error {
    statusCode: StatusCode;
    type: ErrorType;

    constructor(message: string, config?: { statusCode?: StatusCode, type?: ErrorType }) {
        super(message);
        this.statusCode = config?.statusCode ?? StatusCode.BAD_REQUEST;
        this.type = config?.type ?? ErrorType.BAD_REQUEST;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, { statusCode: StatusCode.NOT_FOUND, type: ErrorType.NOT_FOUND });
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, { statusCode: StatusCode.BAD_REQUEST, type: ErrorType.BAD_REQUEST });
    }
}

export class ForbiddenError extends CustomError {
    constructor(message = 'Permission denied') {
        super(message, { statusCode: StatusCode.FORBIDDEN, type: ErrorType.FORBIDDEN });
    }
}

export class ApiKeyError extends CustomError {
    apiKey?: string;
    constructor(apiKey: string, message = 'External access forbidden') {
        super(message, { statusCode: StatusCode.FORBIDDEN, type: ErrorType.FORBIDDEN });
        this.apiKey = apiKey;
    }
}


export class TokenError extends CustomError {
    token?: string;
    constructor(config: { token: string, type?: ErrorType }, message = 'Authentication failed',) {
        super(message, { statusCode: StatusCode.FORBIDDEN, type: config.type ?? ErrorType.BAD_TOKEN });


    }
}



export class ApiOrmError extends CustomError {
    error?: any;
    constructor(error: any, message = 'An error occurred during processing request') {
        super(message, { statusCode: StatusCode.INTERNAL_ERROR, type: ErrorType.INTERNAL });
        this.error = error;
    }
}


export default CustomError;

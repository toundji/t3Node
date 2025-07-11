import { User } from "entities/user.entity";
import { Request } from "express";
import jwt from 'jsonwebtoken';


export function apiNormalizationPort(port: any) {
    const value = parseInt(port);

    if (isNaN(value)) {
        return port;
    }
    if (value > 0) {
        return value;
    }
    return false;
}

export function apiErrorHandler(error: any, port: any, server: any) {
    if (error.syscall == "listen") {
        throw error;
    }

    const address = server.address();
    const bind = typeof address == "string" ? "pipe " + address : 'port ' + port;

    switch (error.code) {
        case "EACCES":
            console.log(bind + ' required elevated privileges.');
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            break;
        default:
            console.log("server started")
            throw error;
    }
}

export function getBaseUrl(req: Request): string {
    return `${req.protocol}://${req.get('host')}`;
}

export function generateToken(user: User) {
    return jwt.sign({ payload: { email: user.email, id: user.id, role: user.role, status: user.status } }, process.env.JWT_SECRET ?? '', { expiresIn: process.env.JWT_EXPIRE as any });
}

export function getIp(req: any) {
    return req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket?.remoteAddress || req.ip;
}
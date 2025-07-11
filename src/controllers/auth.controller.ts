import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await authService.register(req.body);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await authService.login(req.body);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}


export default {
    register,
    login
};

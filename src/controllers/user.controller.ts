import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import { UserRole } from '../core/enums/user-role';
import CustomError, { ForbiddenError } from '../core/custom-error';



async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const list = await userService.getAllUsers();
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

async function findOneById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.findOneById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function myInfo(req: Request | any, res: Response, next: NextFunction) {
    try {
        const user = await userService.findOneById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function createOneByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.createByAdmin(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateOneByAdmin(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function updateMyInfo(req: Request | any, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateOne(req.user.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.deleteOne(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function blockOne(req: Request | any, res: Response, next: NextFunction) {
    try {
        if (req.user.role == UserRole.ADMIN || req.user.id == req.params.id) {
            const user = await userService.updateOneByAdmin(req.params.id, { status: false });
            res.status(200).json(user);
        } else {
            throw new ForbiddenError();
        }
    } catch (error) {
        next(error);
    }
}

async function activeOne(req: Request | any, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateOneByAdmin(req.params.id, { status: true });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


async function filterUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.filter(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


export default {
    getList,
    findOneById,
    updateOne,
    deleteOne,
    createOneByAdmin,
    filterUser,
    myInfo,
    updateMyInfo,
    blockOne,
    activeOne,
};

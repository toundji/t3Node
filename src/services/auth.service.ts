


import * as bcrypt from 'bcrypt';

import UserModel, { User } from "../entities/user.entity";

import { ApiOrmError, BadRequestError, ForbiddenError } from '../core/custom-error';
import { generateToken } from '../core/utils';
import { LoginDto, RegisterDto } from '../dto/user.dto';

async function login(body: LoginDto) {
    const user: User | null = await UserModel.findOne({ email: body.email })
        .select('+password')
        .catch(error => { throw new ApiOrmError(error) })
    if (!user) {
        throw new ForbiddenError("Username or password invalid")
    }

    if (!user.status) {
        throw new ForbiddenError("Account blocked. Please contact an admin for more information")
    }

    const valid = bcrypt.compare(body.password!, user.password!);

    if (!valid) {
        throw new ForbiddenError("Username or password invalid")
    }

    return {
        token: generateToken(user),
        user: user,
    }

}


async function register(body: RegisterDto) {
    const old = await UserModel.findOne({ email: body.email }).lean().exec().catch(error => { throw new ApiOrmError(error) })
    if (old) {
        throw new BadRequestError("User with this email already exist")
    }

    delete (body as any).role;
    delete (body as any).status;

    const usr = new UserModel(body);
    const user = await usr.save().catch(error => { throw new ApiOrmError(error) });

    return {
        token: generateToken(user),
        user: user,
    }

}


export default {
    register,
    login,
}
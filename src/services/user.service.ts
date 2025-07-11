
import UserModel, { User } from "../entities/user.entity";

import CustomError, { ApiOrmError, BadRequestError, NotFoundError } from '../core/custom-error';
import { UserCreateDto, UserFilterDto, UserUpDto } from '../dto/user.dto';

async function getAllUsers(): Promise<User[]> {
    return UserModel.find().lean().exec().catch(error => {
        throw new ApiOrmError(error)
    });
}


async function createByAdmin(body: UserCreateDto) {
    const old = await UserModel.findOne({ email: body.email }).lean().exec().catch(error => { throw new ApiOrmError(error) })
    if (old) {
        throw new CustomError("User with this email already exist")
    }

    const usr = new UserModel(body);
    const user = await usr.save().catch(error => { throw new ApiOrmError(error) });

    return user;

}


async function findOneById(id: string): Promise<User> {
    const user = await UserModel.findById(id).lean().exec().catch(error => {
        throw new ApiOrmError(error);
    });

    if (user) {
        return user;
    }

    throw new NotFoundError(`User with id ${id} not found`);
}


async function updateOne(id: string, body: UserUpDto) {
    delete body.status;
    delete body.role;
    delete (body as any).password;

    const result = await UserModel.updateOne({ _id: id }, { $set: { ...body } }).exec().catch(error => {
        throw new ApiOrmError(error);
    });

    if (result.modifiedCount === 0) {
        throw new BadRequestError('Invalid user. Any modification applied');
    }

    return await findOneById(id);

}

async function updateOneByAdmin(id: string, body: UserUpDto) {
    delete (body as any).password;

    const result = await UserModel.updateOne({ _id: id }, { $set: { ...body } }).exec().catch(error => {
        throw new ApiOrmError(error);
    });

    if (result.modifiedCount === 0) {
        throw new BadRequestError('Aucune modification effectuée ou utilisateur non trouvé');
    }

    return await findOneById(id);

}


async function deleteOne(id: string) {
    const user = await findOneById(id);

    const result = await UserModel.deleteOne({ _id: id }).exec().catch(error => {
        throw new ApiOrmError(error);
    });

    if (result.deletedCount === 0) {
        throw new BadRequestError('invalid user');
    }

    return result;

}

async function exists(id: string): Promise<boolean> {
    const user = await UserModel.exists({ _id: id, status: true });
    return user !== null && user !== undefined;
}

async function filter(body: UserFilterDto) {

    delete (body as any).password;
    return await UserModel.find({ ...body }).exec().catch(error => {
        throw new ApiOrmError(error);
    });
}


export default {
    getAllUsers,
    findOneById,
    exists,
    updateOne,
    deleteOne,
    createByAdmin,
    filter,
    updateOneByAdmin
};


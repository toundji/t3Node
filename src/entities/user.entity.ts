import { UserRole } from "../core/enums/user-role";
import mongoose, { Schema, Document, model } from "mongoose";
import * as bcrypt from 'bcrypt';


export interface User extends Document {
    name: string,
    birthDate: Date;
    email: string;
    role: UserRole
    status: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    birthDate: {
        type: Date,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    status: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password as string, 10);
    next();
});


const UserModel = model<User>('User', userSchema);

export default UserModel;
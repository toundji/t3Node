import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from '../../entities/user.entity';


dotenv.config();

console.log(process.env.DB_URL);

const data = [
    {
        name: 'Admin',
        email: 'admin@atoundji.com',
        password: 'atoundji.com',
        birthDate: new Date('2000-01-01'),
        role: 'admin',
        status: true,
    },
    {
        name: 'User',
        email: 'user@atoundji.com',
        password: 'atoundji.com',
        birthDate: new Date('1999-05-20'),
        role: 'user',
        status: true,
    }
];

async function runSeeder() {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log('Connected to database');

        const users = await UserModel.find({
            email: { $in: ['admin@atoundji.com', 'user@atoundji.com'] }
        }).lean().exec();

        if (!users.length) {
            await UserModel.deleteMany({});
            console.log('Cleared User collection');
            for (const userData of data) {
                const user = new UserModel(userData);
                await user.save();
            }
            console.log('Inserted seed users');
        }

        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (err) {
        console.error('Error while seeding:', err);
        process.exit(1);
    }
}

runSeeder();
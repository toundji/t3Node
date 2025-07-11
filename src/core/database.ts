import mongoose from 'mongoose';

async function connectDb() {
    mongoose.connect(process.env.DB_URL ?? '',
        {})
        .then(() => console.log('Successful connect to mongodb !'))
        .catch(() => console.log('Connection to mongodb filled !'));
}

export default connectDb;

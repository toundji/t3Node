import express, { Express, Request, Response } from "express";
import errorMiddleware from "./core/middlewares/error.middleware";
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import auth, { apiKeyVerification, deserialization } from './core/middlewares/auth.middleware'


import path from "path";
import connectDb from "./core/database";
import swaggerDocs from "./core/swaggers";
import * as dotenv from 'dotenv';
const basicAuth = require('express-basic-auth')





const app: Express = express();

dotenv.config();





connectDb()
app.use(express.json())


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
console.log([process.env.DOC_USER_NAME as string], process.env.DOC_PASSWORD,)

app.use(
    ['/docs'],
    basicAuth({
        challenge: true,
        users: {
            [process.env.DOC_USER_NAME as string]: process.env.DOC_PASSWORD,
        },
    }),
);

swaggerDocs(app, Number(process.env.PORT ?? 3000))


app.use(apiKeyVerification);
app.use(deserialization);
app.use("/api/auth", authRouter);
app.use("/api/users", auth, userRouter);


app.use(errorMiddleware);


export default app;
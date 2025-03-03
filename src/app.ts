import express, { Application, Request, Response } from "express";
import cors from 'cors';
import router from "./app/routes";
import morgan from "morgan";

const app: Application = express();

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req:Request, res:Response) => {
    res.send('This is Quiz app server');
});



//application rooutes
app.use('/api/v1', router);


export default app;
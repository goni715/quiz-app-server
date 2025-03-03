import express, { Request, Response } from "express";

const app = express();


app.get('/', (req:Request, res:Response) => {
    res.send('This is Quiz app server');
})


export default app;
import { ErrorRequestHandler } from "express";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): any => {
    const statusCode = err.statusCode || 5000;
    const message = err?.message || 'Something Weng Wrong';


    //res.status(statusCode).json({
       // success: false,
       // message,
       // error: err
    //})

    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err
    })
}

export default globalErrorHandler;
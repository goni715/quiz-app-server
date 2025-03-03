import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err?.message || 'Something Weng Wrong';

    res.status(statusCode).json({
        success: false,
        message
    })
}

export default globalErrorHandler;
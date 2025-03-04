import { Response } from "express";



const sendResponse = <T>(res: Response, jsonData: { statusCode: number; success: boolean; message: string, data:T}) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        message: jsonData.message,
        data: jsonData.data
    })
}

export default sendResponse;
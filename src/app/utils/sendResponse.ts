import { Response } from "express";



const sendResponse = <T>(res: Response, jsonData: {statusCode: number; success: boolean, message: string}, data:T) => {
    
}

export default sendResponse;
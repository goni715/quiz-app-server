import { Request, Response } from "express"
import { registerUserService } from "./user.service"
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";



const registerUser = catchAsync(async (req: Request, res: Response) => {
   const result = await registerUserService(req.body);
   sendResponse(res, {
     statusCode: 201,
     success: true,
     message: "User is registered successfully",
     data: result
   })
})



export {
    registerUser
}
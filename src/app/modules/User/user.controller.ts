import { Request, Response } from "express"
import { registerUserService } from "./user.service"



const registerUser = (req: Request, res: Response) => {
   const result = registerUserService();
   res.status(201).json({
     success: true,
     data: result
   })
}



export {
    registerUser
}
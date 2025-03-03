import { Request, Response } from "express"
import { registerUserService } from "./user.service"



const registerUser = async (req: Request, res: Response) => {
   const result = await registerUserService(req.body);
   res.status(201).json({
     success: true,
     data: result
   })
}



export {
    registerUser
}
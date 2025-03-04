import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";


const registerUserService = async (payload: IUser) => {
    const user = await UserModel.findOne({ email:payload.email });
    if(user){
       throw new AppError(400, 'Email is already existed')
    }

    const result = await UserModel.create(payload);
    return result;
}


export {
    registerUserService
}
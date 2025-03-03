import ApiError from "../../errors/ApiError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";


const registerUserService = async (payload: IUser) => {
    const user = await UserModel.findOne({ email:payload.email });
    if(user){
        throw new ApiError(400, 'Email is already existed')
    }

    return "20";
}


export {
    registerUserService
}
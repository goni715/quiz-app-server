import { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import { ILoginUser, IUser } from "./user.interface";
import UserModel from "./user.model";


const registerUserService = async (payload: IUser) => {
    const user = await UserModel.findOne({ email:payload.email });
    if(user){
       throw new AppError(400, 'Email is already existed')
    }

    const result = await UserModel.create(payload);
    return result;
}


const loginUserService = async (payload: ILoginUser) => {
    const user = await UserModel.findOne({ email: payload.email });
    if(!user){
        throw new AppError(404, `Couldn't find this email address`);
    }

    //check password
    const isPasswordMatch = await checkPassword(payload.password, user.password);
    if(!isPasswordMatch){
        throw new AppError(400, 'Password is not correct');
    }

    //create accessToken
    const accessToken = createToken({email: user.email, id: String(user._id)}, config.jwt_access_secret as Secret, config.jwt_access_expires_in as TExpiresIn);
    //create refreshToken
    const refreshToken = createToken({email: user.email, id: String(user._id)}, config.jwt_refresh_secret as Secret, config.jwt_refresh_expires_in as TExpiresIn);

    return {
        accessToken,
        refreshToken
    }
}


export {
    registerUserService,
    loginUserService
}
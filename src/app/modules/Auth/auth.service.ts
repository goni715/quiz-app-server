import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";


const forgotPassVerifyEmailService = async (email: string) => {
    const user = await UserModel.findOne({ email });
    if(!user){
        throw new AppError(404, `Couldn't find this email address`);
    }
}




export {
    forgotPassVerifyEmailService
}
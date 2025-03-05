import { Secret } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import checkPassword from "../../utils/checkPassword";
import { IUser } from "../User/user.interface";
import UserModel from "../User/user.model";
import { ILoginUser, IVerifyOTp } from "./auth.interface";
import createToken, { TExpiresIn } from "../../utils/createToken";
import config from "../../config";
import OtpModel from "./otp.model";
import sendEmailUtility from "../../utils/sendEmailUtility";


const registerUserService = async (payload: IUser) => {
    const user = await UserModel.findOne({ email: payload.email });
    if (user) {
        throw new AppError(400, 'Email is already existed')
    }

    const result = await UserModel.create(payload);
    return result;
}


const loginUserService = async (payload: ILoginUser) => {
    const user = await UserModel.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError(404, `Couldn't find this email address`);
    }

    //check password
    const isPasswordMatch = await checkPassword(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(400, 'Password is not correct');
    }




    //create accessToken
    const accessToken = createToken({ email: user.email, id: String(user._id) }, config.jwt_access_secret as Secret, config.jwt_access_expires_in as TExpiresIn);
    //create refreshToken
    const refreshToken = createToken({ email: user.email, id: String(user._id) }, config.jwt_refresh_secret as Secret, config.jwt_refresh_expires_in as TExpiresIn);

    return {
        accessToken,
        refreshToken
    }
}


//forgot password
// step-01
const forgotPassVerifyEmailService = async (email: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError(404, `Couldn't find this email address`);
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    //insert the otp
    await OtpModel.create({ email, otp });


    //send otp to the email address
    await sendEmailUtility(email, String(otp))

    return null;

}


//step-02
const forgotPassVerifyOtpService = async (payload: IVerifyOTp) => {
  const { email, otp } = payload;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, `Couldn't find this email address`);
  }

  //check otp doesn't exist
  const otpExist = await OtpModel.findOne({ email, otp, status: 0 });
  if (!otpExist) {
    throw new AppError(400, "Invalid Otp Code");
  }

  //check otp is expired
  const otpExpired = await OtpModel.findOne({
    email,
    otp,
    status: 0,
    otpExpires: { $gt: new Date(Date.now()) },
  });

  if(!otpExpired) {
    throw new AppError(400, "This Otp is expired");
  }


   //update the otp status
   await OtpModel.updateOne(
    { email, otp, status:0 },
    { status: 1 }
   );

  return null;
};




export {
    registerUserService,
    loginUserService,
    forgotPassVerifyEmailService,
    forgotPassVerifyOtpService
}
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { forgotPassCreateNewPassService, forgotPassSendOtpService, forgotPassVerifyOtpService, loginAdminService, loginUserService, registerUserService } from "./auth.service";



const registerUser = catchAsync(async (req, res) => {
  const result = await registerUserService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User is registered successfully",
    data: result
  })
})



const loginUser = catchAsync(async (req, res) => {
 const result = await loginUserService(req.body);
 const { accessToken, refreshToken} = result;
 
 res.cookie("refreshToken", refreshToken, {
   httpOnly: true,  // Prevents client-side access to the cookie (more secure)
   secure: config.node_env === "production", // Only use HTTPS in production
   maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 day
   sameSite: "strict", // Prevents CSRF attacks
 });

 sendResponse(res, {
   statusCode: 200,
   success: true,
   message: "User is logged in successfully",
   data: {
     accessToken
   }
 })
})

const loginAdmin = catchAsync(async (req, res) => {
  const result = await loginAdminService(req.body);
  const { accessToken, refreshToken} = result;
  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,  // Prevents client-side access to the cookie (more secure)
    secure: config.node_env === "production", // Only use HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 day
    sameSite: "strict", // Prevents CSRF attacks
  });
 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin is logged in successfully",
    data: {
      accessToken
    }
  })
 })

//forgot-password
//step-01
const forgotPassSendOtp = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPassSendOtpService(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Email is verified & Otp is sent successfully",
    data: result
  })
});


//step-02
const forgotPassVerifyOtp = catchAsync(async (req, res) => {
    const result = await forgotPassVerifyOtpService(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Otp is verified successfully",
      data: result
    })
 });


 //step-03
const forgotPassCreateNewPass = catchAsync(async (req, res) => {
  const result = await forgotPassCreateNewPassService(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password is reset successfully",
    data: result
  })
});





 export {
  registerUser,
  loginUser,
  loginAdmin,
  forgotPassSendOtp,
  forgotPassVerifyOtp,
  forgotPassCreateNewPass
 }
 
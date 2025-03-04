import { Request, Response } from "express"
import { loginUserService, registerUserService } from "./user.service"
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";



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


export {
    registerUser,
    loginUser
}
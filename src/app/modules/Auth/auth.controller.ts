import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { forgotPassVerifyEmailService } from "./auth.service";



const forgotPassVerifyEmail = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await forgotPassVerifyEmailService(email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Email is verified successfully",
      data: result
    })
 });



 export {
  forgotPassVerifyEmail
 }
 
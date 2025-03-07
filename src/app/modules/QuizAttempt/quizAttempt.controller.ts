import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { submitQuizAttemptService } from "./quizAttempt.service";



const submitQuizAttempt = catchAsync(async (req, res) => {
    const result = await submitQuizAttemptService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz Attempt is submitted successfully",
      data: result
    })
})



export {
    submitQuizAttempt
}
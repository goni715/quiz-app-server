import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { submitQuizAnswerService } from "./quizAnswer.service";



const submitQuizAnswer = catchAsync(async (req, res) => {
    const result = await submitQuizAnswerService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz Answer is submitted successfully",
      data: result
    })
})



export {
    submitQuizAnswer
}
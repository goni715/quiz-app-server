import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IType } from "./quizAnswer.interface";
import { getQuizResultsService, submitQuizAnswerService } from "./quizAnswer.service";



const submitQuizAnswer = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;

    const result = await submitQuizAnswerService(loginUserId as string, req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz Answer is submitted successfully",
      data: result
    })
})


const getQuizResults = catchAsync(async (req, res) => {
  const { type } = req.params;
    const result = await getQuizResultsService(type as IType);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz result retrieved successfully",
      data: result
    })
})


export {
    submitQuizAnswer,
    getQuizResults
}
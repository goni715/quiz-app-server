import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { HistoryValidFields } from "./quizAnswer.constant";
import { IType } from "./quizAnswer.interface";
import { calculateXPService, getMyQuizHistoryService, getQuizResultsService, submitQuizAnswerService } from "./quizAnswer.service";



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
      statusCode: 200,
      success: true,
      message: "Quiz result retrieved successfully",
      data: result
    })
})


const getMyQuizHistory = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const validatedQuery = pickValidFields(req.query, HistoryValidFields);
    const result = await getMyQuizHistoryService(loginUserId as string, validatedQuery);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz History retrieved successfully",
      data: result
    })
})



const calculateXP = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { gameSessionId } = req.params;
  const { status } = req.body;

  const result = await calculateXPService(
    gameSessionId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "XP is calculated successfully",
    data: result,
  });
});



export {
    submitQuizAnswer,
    getQuizResults,
    getMyQuizHistory,
    calculateXP
}
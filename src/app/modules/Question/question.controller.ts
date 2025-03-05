import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createQuestionService, deleteQuestionService } from "./question.service";


const createQuestion = catchAsync(async (req, res) => {
    const result = await createQuestionService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Question is created successfully",
      data: result
    })
  })
  


  const deleteQuestion = catchAsync(async (req, res) => {
    const questionId = req.params.questionId;
    const result = await deleteQuestionService(questionId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Question is deleted successfully",
      data: result
    })
  })



export {
    createQuestion,
    deleteQuestion
}
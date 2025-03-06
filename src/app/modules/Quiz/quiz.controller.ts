import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createQuizService, deleteQuizService, getAllQuizService, getSingleQuizService } from "./quiz.service";


const createQuiz = catchAsync(async (req, res) => {
    const result = await createQuizService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz is created successfully",
      data: result
    })
  })
  


  const deleteQuiz = catchAsync(async (req, res) => {
    const quizId = req.params.quizId;
    const result = await deleteQuizService(quizId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz is deleted successfully",
      data: result
    })
  })


  const getAllQuiz = catchAsync(async (req, res) => {
    const result = await getAllQuizService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quizs are retrieved successfully",
      data: result
    })
  })



  const getSingleQuiz = catchAsync(async (req, res) => {
    const quizId = req.params.quizId;
    const result = await getSingleQuizService(quizId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz is retrieved successfully",
      data: result
    })
  })


export {
    createQuiz,
    deleteQuiz,
    getAllQuiz,
    getSingleQuiz
}
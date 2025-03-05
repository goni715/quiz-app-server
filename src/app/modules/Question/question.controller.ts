import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createQuestionService } from "./question.service";


const createQuestion = catchAsync(async (req, res) => {
    const result = await createQuestionService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Question is created successfully",
      data: result
    })
  })
  





export {
    createQuestion
}
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { addToReviewService } from "./review.service";



const addToReview = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { quizId } = req.body;
  const result = await addToReviewService(loginUserId as string, quizId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Quiz added to review mode successfully",
    data: result,
  });
});

export {
    addToReview
}
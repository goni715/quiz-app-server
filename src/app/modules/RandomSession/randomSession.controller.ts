import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createRandomSessionService } from "./randomSession.service";


const createRandomSession = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const result = await createRandomSessionService(loginUserId as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Random Game Session is created successfully",
    data: result,
  });
});
  


export {
    createRandomSession
}
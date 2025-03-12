import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { RandomSessionValidFields } from "./randomSession.constant";
import { createRandomSessionService, getRandomSesssionsService } from "./randomSession.service";


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



const getRandomSessions = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const validatedQuery = pickValidFields(req.query, RandomSessionValidFields);
  const result = await getRandomSesssionsService(loginUserId as string, validatedQuery);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Random Sessions are retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});
  


export {
    createRandomSession,
    getRandomSessions
}
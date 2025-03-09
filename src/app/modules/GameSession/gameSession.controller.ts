import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createGameSessionService, getMyGameSessionsService } from "./gameSession.service";

const createGameSession = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { friendId, quizId } = req.body;

  const result = await createGameSessionService(
    loginUserId as string,
    friendId,
    quizId
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Game Session is created successfully",
    data: result,
  });
});

const getMyGameSessions = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const result = await getMyGameSessionsService(loginUserId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Game Sessions are retrieved successfully",
    data: result
  });
});


export { createGameSession, getMyGameSessions };
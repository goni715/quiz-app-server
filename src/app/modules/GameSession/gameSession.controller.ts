import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createFriendGameSessionService, createRandomGameSessionService, getMyGameSessionsService, updateSessionStatusService } from "./gameSession.service";

const createFriendGameSession = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { opponentId } = req.body;

  const result = await createFriendGameSessionService(
    loginUserId as string,
    opponentId,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Game Session is created successfully",
    data: result,
  });
});



const createRandomGameSession = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { opponentId } = req.body;

  const result = await createRandomGameSessionService(
    loginUserId as string,
    opponentId,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Game Session is created successfully",
    data: result,
  });
});


const updateSessionStatus = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { gameSessionId } = req.params;
  const { status } = req.body;

  const result = await updateSessionStatusService(
    loginUserId as string,
    gameSessionId,
    status
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Game Session is accepeted successfully",
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


export { createFriendGameSession, createRandomGameSession, updateSessionStatus, getMyGameSessions };
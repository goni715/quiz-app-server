import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { makeFriendService } from "./friend.service";


const makeFriend = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { friendId } = req.body;

  const result = await makeFriendService(loginUserId as string, friendId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Friend is made successfully",
    data: result,
  });
});

export { makeFriend };
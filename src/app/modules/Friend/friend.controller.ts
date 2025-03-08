import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getMyFriendsService, makeFriendService } from "./friend.service";


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


const getMyFriends = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;

  const result = await getMyFriendsService(loginUserId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Friends are retrieved successfully",
    data: result,
  });
});

export { makeFriend, getMyFriends };
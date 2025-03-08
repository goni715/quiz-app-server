import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { FriendValidFields } from "./friend.constant";
import { getMyFriendsService, makeFriendService, removeFriendService } from "./friend.service";


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
  const validatedQuery = pickValidFields(req.query, FriendValidFields);
  const result = await getMyFriendsService(loginUserId as string, validatedQuery);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Friends are retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});



const removeFriend = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const { friendId } = req.body;

  const result = await removeFriendService(loginUserId as string, friendId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Friend is removed successfully",
    data: result,
  });
});



export { makeFriend, getMyFriends, removeFriend };
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getSuggestedUsersService } from "./user.service";


const getSuggestedUsers = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const result = await getSuggestedUsersService(loginUserId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Friends are retrieved successfully",
    data: result,
  });
});





export {
    getSuggestedUsers,
}
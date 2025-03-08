import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { UserValidFields } from "./user.constant";
import { getSuggestedUsersService } from "./user.service";


const getSuggestedUsers = catchAsync(async (req, res) => {
  const loginUserId = req.headers.id;
  const validatedQuery = pickValidFields(req.query, UserValidFields);
  const result = await getSuggestedUsersService(loginUserId as string, validatedQuery);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Suggested Users are retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});





export {
    getSuggestedUsers,
}
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createInfoService } from "./info.service";




const createInfo = catchAsync(async (req, res) => {
  const result = await createInfoService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Info is created successfully",
    data: result,
  });
});

export { createInfo };
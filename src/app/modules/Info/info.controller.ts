import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createInfoService, deleteInfoService } from "./info.service";




const createInfo = catchAsync(async (req, res) => {
  const result = await createInfoService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Info is created successfully",
    data: result,
  });
});


const deleteInfo = catchAsync(async (req, res) => {
  const infoId = req.params.infoId;
  const result = await deleteInfoService(infoId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Info is deleted successfully",
    data: result
  })
})

export { createInfo, deleteInfo };
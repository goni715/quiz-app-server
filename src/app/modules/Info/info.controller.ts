import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { InfoValidFields } from "./info.constant";
import { createInfoService, deleteInfoService, getAllInfoService } from "./info.service";




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

const getAllInfo = catchAsync(async (req, res) => {
  const validatedQuery = pickValidFields(req.query, InfoValidFields);
  const result = await getAllInfoService(validatedQuery);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Informations are retrieved successfully",
    meta: result.meta,
    data: result.data
  })
})


export { createInfo, deleteInfo, getAllInfo };
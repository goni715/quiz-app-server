import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getSummaryService } from "./summary.service";



const getSummarty = catchAsync(async (req, res) => {
    const result = await getSummaryService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Summary retrieved successfully",
      data: result
    })
  })


  export {
    getSummarty
  }
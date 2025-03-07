import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { IInfo } from "./info.interface";
import InfoModel from "./info.model";



const createInfoService = async (payload: IInfo) => {

    const { title, subTitle } = payload;
    
    //check if title is existed
    const titleExist = await InfoModel.findOne({ title });
    if(titleExist){
        throw new AppError(409, 'Title is already existed');
    }

    //check if subTitle is existed
    const subTitleExist = await InfoModel.findOne({ subTitle });
    if(subTitleExist){
        throw new AppError(409, 'Sub Title is already existed');
    }

    //create an info
    const result = await InfoModel.create(payload);
    return result;
}






const deleteInfoService = async (infoId: string) => {

    const ObjectId = Types.ObjectId;
    //check infoId doesn't exist
    const info = await InfoModel.findById(infoId);
    if(!info) {
        throw new AppError(404, `This infoId doesn't exist`);
    } 

    const result = await InfoModel.deleteOne({ _id: new ObjectId(infoId)});
    return result;
}


export {
    createInfoService,
    deleteInfoService
}
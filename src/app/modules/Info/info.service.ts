import AppError from "../../errors/AppError";
import { IInfo } from "./info.interface";
import InfoModel from "./info.model";



const createInfoService = async (payload: IInfo) => {

    const { title, subTitle } = payload;
    
    const titleExist = await InfoModel.findOne({ title });
    if(titleExist){
        throw new AppError(409, 'Title is already existed');
    }

    const subTitleExist = await InfoModel.findOne({ subTitle });
    if(subTitleExist){
        throw new AppError(409, 'Sub Title is already existed');
    }

    const result = await InfoModel.create(payload);
    return result;
}


export {
    createInfoService
}
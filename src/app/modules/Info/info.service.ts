import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { IInfo, TInfoQuery } from "./info.interface";
import InfoModel from "./info.model";
import { makeSearchQuery } from "../../helper/QueryBuilder";
import { InfoSearchFields } from "./info.constant";



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


const getAllInfoService = async (query: TInfoQuery) => {
    // 1. Extract query parameters
    const {
        searchTerm,   // Text to search
        page = 1,     // Default to page 1
        limit = 10,   // Default to 10 results per page // Default sort field
        sortOrder = 'desc',
        sortBy: SortField,      // Default sort order
        ...filters               // Any additional filters
    } = query;

     // 2. Set up pagination
     const skip = (Number(page) - 1) * Number(limit);

     // 3. Set up sorting
     let sortBy = 'createdAt'
     if(SortField){
        sortBy=SortField
     }

     const sorting = sortOrder === 'asc' ? 1 : -1 ;
   

    
     let finalQuery = {};


    if(searchTerm){
        const searchQuery = makeSearchQuery(searchTerm, InfoSearchFields)
        finalQuery = {
            ...finalQuery,
            ...searchQuery
        }
    }

    // 6. Execute query with pagination and sorting
    const result = await InfoModel.find(finalQuery)
    .skip(skip)
    .limit(Number(limit))
    .sort({[sortBy]: sorting});


    // 7. Get total count for pagination
    const total = await InfoModel.countDocuments(finalQuery);
    const totalPages = Math.ceil(total / Number(limit));

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPages,
            total,
        },
        data: result
    };
}



export {
    createInfoService,
    deleteInfoService,
    getAllInfoService
}
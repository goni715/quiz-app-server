import slugify from "slugify"
import QuizModel from "./quiz.model"
import AppError from "../../errors/AppError";
import { Types } from "mongoose";
import { IQuiz, TQuizQuery } from "./quiz.interface";
import pickValidFields from "../../utils/pickValidFields";
import { QuizSearchFields } from "./quiz.constant";
import { makeSearchQuery } from "../../helper/QueryBuilder";


const createQuizService = async (payload: IQuiz) => {
    const slug = slugify(payload.quiz);
    
    //check Quiz is already existed
    const Quiz = await QuizModel.findOne({ slug: slug.toLowerCase() });
    if(Quiz){
        throw new AppError(409, 'Quiz is already existed');
    }

    const result = await QuizModel.create({
        ...payload,
        slug: slug.toLowerCase()
    });


    return result;
}

const deleteQuizService = async (quizId: string) => { 
    const ObjectId = Types.ObjectId;
    //check quizId doesn't exist
    const Quiz = await QuizModel.findById(quizId);
    if(!Quiz) {
        throw new AppError(404, `This quizId doesn't exist`);
    } 

    const result = QuizModel.deleteOne({ _id: new ObjectId(quizId) });
    return result;

}


const getAllQuizService = async (query: TQuizQuery) => {
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

    //  const searchRegex = QuizSearchFields.map((item)=>({
    //     [item] : { $regex: searchTerm, $options: 'i' }
    //  }))

     

      // 4. Set up search
    //  if (searchTerm) {
    //     finalQuery = {
    //         ...finalQuery,
    //         $or: [
    //             { name: { $regex: searchTerm, $options: 'i' } },    // Case-insensitive name search
    //             { email: { $regex: searchTerm, $options: 'i' } }   // Case-insensitive email search
    //         ]
    //     };
    // }


    if(searchTerm){
        const searchQuery = makeSearchQuery(searchTerm, QuizSearchFields)
        finalQuery = {
            ...finalQuery,
            ...searchQuery
        }
    }

    // 6. Execute query with pagination and sorting
    const result = await QuizModel.find(finalQuery)
    .skip(skip)
    .limit(Number(limit))
    .sort({[sortBy]: sorting});


    // 7. Get total count for pagination
    const total = await QuizModel.countDocuments(finalQuery);
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


const getSingleQuizService = async (quizId: string) => {
    const Quiz = await QuizModel.findById(quizId);
    if(!Quiz) {
        throw new AppError(404, `This quizId doesn't exist`);
    } 

    return Quiz;
}


export {
    createQuizService,
    deleteQuizService,
    getAllQuizService,
    getSingleQuizService
}
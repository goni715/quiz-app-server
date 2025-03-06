import slugify from "slugify"
import QuizModel from "./quiz.model"
import AppError from "../../errors/AppError";
import { Types } from "mongoose";
import { IQuiz } from "./quiz.interface";


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


const getAllQuizService = async () => {
    const result = await QuizModel.find()
    return result;
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
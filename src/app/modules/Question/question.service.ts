import slugify from "slugify"
import { IQuestion } from "./question.interface"
import QuestionModel from "./question.model"
import AppError from "../../errors/AppError";
import { Types } from "mongoose";


const createQuestionService = async (payload: IQuestion) => {
    const slug = slugify(payload.question);
    
    //check question is already existed
    const question = await QuestionModel.findOne({ slug: slug.toLowerCase() });
    if(question){
        throw new AppError(409, 'Question is already existed');
    }

    const result = await QuestionModel.create({
        ...payload,
        slug: slug.toLowerCase()
    });


    return result;
}

const deleteQuestionService = async (questionId: string) => {
    
    const ObjectId = Types.ObjectId;
    //check questionId doesn't exist
    const question = await QuestionModel.findById(questionId);
    if(!question) {
        throw new AppError(404, `This questionId doesn't exist`);
    } 

    const result = QuestionModel.deleteOne({ _id: new ObjectId(questionId) });
    return result;

}


const getAllQuestionService = async () => {
    const result = await QuestionModel.find()
    return result;
}


const getSingleQuestionService = async (questionId: string) => {
    const question = await QuestionModel.findById(questionId);
    if(!question) {
        throw new AppError(404, `This questionId doesn't exist`);
    } 

    return question;
}


export {
    createQuestionService,
    deleteQuestionService,
    getAllQuestionService,
    getSingleQuestionService
}
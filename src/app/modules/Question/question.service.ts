import { IQuestion } from "./question.interface"
import QuestionModel from "./question.model"


const createQuestionService = async (payload: IQuestion) => {
    await QuestionModel.create(payload)
    return "success"
}



export {
    createQuestionService
}
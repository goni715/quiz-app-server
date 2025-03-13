import AppError from "../../errors/AppError";
import QuizModel from "../Quiz/quiz.model"
import ReviewModel from "./review.model";


const addToReviewService = async (loginUserId: string, quizId: string) => {

    const quiz = await QuizModel.findById(quizId);
    if(!quiz){
        throw new AppError(404, "Quiz not found")
    }

    const result = await ReviewModel


    return {
        loginUserId,
        quizId
    }
}

export {
    addToReviewService
}
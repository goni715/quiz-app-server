import QuizModel from "../Quiz/quiz.model";
import UserModel from "../User/user.model";



const getSummaryService = async () => {
    const totalUsers = await UserModel.countDocuments();
    const totalQuizzes = await QuizModel.countDocuments();
    return {
        totalUsers,
        totalQuizzes
    }
}


export {
    getSummaryService
}
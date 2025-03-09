import { IQuizAnswer } from "./quizAnswer.interface"



const submitQuizAnswerService = async (loginUserId: string, friendId: string, quizId: string) => {
    return {
        loginUserId,
        friendId,
        quizId
    }
}


export {
    submitQuizAnswerService
}
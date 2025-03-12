import QuizModel from "../Quiz/quiz.model";
import RandomSessionModel from "./randomSession.model";



const createRandomSessionService = async (loginUserId: string) => {
  //get the quizIds
  const data = await QuizModel.find({}, "_id").lean();
  const quizIds = data?.map((quiz) => quiz._id);

  const result = await RandomSessionModel.create({
    players: [loginUserId],
    quizzes: quizIds
  });
  return result;
}


export {
    createRandomSessionService
}
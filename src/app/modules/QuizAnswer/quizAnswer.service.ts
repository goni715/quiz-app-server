import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import AppError from "../../errors/AppError";
import FriendModel from "../Friend/friend.model";
import GameSessionModel from "../GameSession/gameSession.model";
import QuizModel from "../Quiz/quiz.model";
import UserModel from "../User/user.model";
import { ISubmitAnswer } from "./quizAnswer.interface";
import QuizAnswerModel from "./quizAnswer.model";



const submitQuizAnswerService = async (
  loginUserId: string,
  payload: ISubmitAnswer
) => {

  const { friendId, quizId, selectedOption, xp } = payload;

  const user = await UserModel.findById(friendId);
  if (!user) {
    throw new AppError(404, "User not found with this friendId");
  }


   //check this user is not already existed in your friend list
   const friend = await FriendModel.findOne({
    friends: { $all: [loginUserId, friendId] },
  });

  if (!friend) {
    throw new AppError(404, "This friendId is not existed in your friend list");
  }


  const quiz = await QuizModel.findById(quizId);
  if (!quiz) {
    throw new AppError(404, "This quizId not found");
  }

  //check gameSession doesn't exist
  const gameSession = await GameSessionModel.findOne({
    players: { $all: [loginUserId, friendId] },
    quiz: quizId,
  });

  if (!gameSession) {
    throw new AppError(404, "Game session Doesn't exist ");
  }


  if(!quiz.options.includes(selectedOption)){
    throw new AppError(404, "selected option does not exist within the options");
  }


  const isCorrect = quiz.answer === selectedOption;


  //check you have already submitted the answer
  const quizAnswer = await QuizAnswerModel.findOne({
    gameSessionId: gameSession._id,
    userId: loginUserId,
    quizId: quiz._id,
  })

  if(quizAnswer){
    throw new AppError(409, "You have alraedy submitted the answer")
  }

  //Save user's answer
  const result = await QuizAnswerModel.create({
    gameSessionId: gameSession._id,
    userId: loginUserId,
    quizId: quiz._id,
    selectedOption,
    isCorrect,
    xp
  });


  return result;

};

// 🟢 Get Quiz Results (Weekly or Monthly)
const getQuizResultsService = async (type: "weekly" | "monthly") => {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  if (type === "monthly") {
    endDate = new Date(now.toISOString().split("T")[0] + "T23:59:59.999+00:00");
    now.setDate(now.getDate() - 29);
    startDate = new Date(now.toISOString().split("T")[0]); // 29 days ago = 30 days
    // Last day of the month
  } else {
    endDate = new Date(now.toISOString().split("T")[0] + "T23:59:59.999+00:00");
    now.setDate(now.getDate() - 6);
    startDate = new Date(now.toISOString().split("T")[0]); // 6 days ago = 7 days
  }


  const result = await QuizAnswerModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$userId",
        totalXP: { $sum: "$xp" },
        totalCorrect: { $sum: { $cond: ["$isCorrect", 1, 0] } }, // Count correct answers
        totalAttempted: { $sum: 1 }, // Count total attempted quizzes
      },
    },
  ])

  return result;
   
   
}


export {
    submitQuizAnswerService,
    getQuizResultsService
}
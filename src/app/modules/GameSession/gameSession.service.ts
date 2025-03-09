import AppError from "../../errors/AppError";
import FriendModel from "../Friend/friend.model";
import QuizModel from "../Quiz/quiz.model";
import UserModel from "../User/user.model";
import GameSessionModel from "./gameSession.model";



const createGameSessionService = async (
  loginUserId: string,
  friendId: string,
  quizId: string
) => {

  if (loginUserId === friendId) {
    throw new AppError(409, "This friendId is your id");
  }


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


  //check gameSession is already existed
  const gameSession = await GameSessionModel.findOne({
    players: { $all: [loginUserId, friendId] },
    quiz: quizId
  });

  if (gameSession) {
    throw new AppError(409, "Game session is already existed");
  }

  // Create a new game session
  const newGameSession = await GameSessionModel.create({
    players: [loginUserId, friendId],
    quiz: quizId,
  });

  return newGameSession;
};


const getMyGameSessionsService = async (loginUserId: string) => {
  const result = await GameSessionModel.find({
    players: {$in : [loginUserId]}
  })

  return result;
   
}

export { createGameSessionService, getMyGameSessionsService };
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import FriendModel from "../Friend/friend.model";
import QuizModel from "../Quiz/quiz.model";
import UserModel from "../User/user.model";
import GameSessionModel from "./gameSession.model";



const createFriendGameSessionService = async (
  loginUserId: string,
  opponentId: string,
) => {


  if (loginUserId === opponentId) {
    throw new AppError(409, "This friendId is your id");
  }


  const user = await UserModel.findById(opponentId);
  if (!user) {
    throw new AppError(404, "User not found with this friendId");
  }

   //check this user is not already existed in your friend list
   const friend = await FriendModel.findOne({
    friends: { $all: [loginUserId, opponentId] },
  });

  if (!friend) {
    throw new AppError(404, "This friendId is not existed in your friend list");
  }


  //get the quizIds
  const data = await QuizModel.find({}, "_id").lean();
  const quizIds = data?.map((quiz) => quiz._id);

  //check gameSession is already existed
  const gameSession = await GameSessionModel.findOne({
    players: { $all: [loginUserId, opponentId] }
  });

  if (gameSession) {
    throw new AppError(409, "Game session is already existed");
  }

  // Create a new game session
  const newGameSession = await GameSessionModel.create({
    players: [loginUserId, opponentId],
    quizzes: quizIds,
    receiverId: opponentId
  });

  return newGameSession;
};



const createRandomGameSessionService = async (
  loginUserId: string,
  opponentId: string,
) => {

  if (loginUserId === opponentId) {
    throw new AppError(409, "This opponentId is your id");
  }


  const user = await UserModel.findById(opponentId);
  if (!user) {
    throw new AppError(404, "User not found with this friendId");
  }

   //check this user is not already existed in your friend list
   const friend = await FriendModel.findOne({
    friends: { $all: [loginUserId, opponentId] },
  });

  if (friend) {
    throw new AppError(404, "This opponentId is existed in your friend list");
  }


  //get the quizIds
  const data = await QuizModel.find({}, "_id").lean();
  const quizIds = data?.map((quiz) => quiz._id);

  //check gameSession is already existed
  const gameSession = await GameSessionModel.findOne({
    players: { $all: [loginUserId, opponentId] }
  });

  if (gameSession) {
    throw new AppError(409, "Game session is already existed");
  }

  // Create a new game session
  const newGameSession = await GameSessionModel.create({
    players: [loginUserId, opponentId ],
    quizzes: quizIds,
    status: "accepted",
    receiverId: opponentId
  });

  return newGameSession;
};

// one by one quiz answer // there will be no friend checking


const updateSessionStatusService = async (loginUserId: string, gameSessionId: string, status: string) => {

  const ObjectId = Types.ObjectId;

  //check gameSession does not exist
  const gameSession = await GameSessionModel.findOne({
    _id: gameSessionId,
    players: { $in: [loginUserId] }
  });

  if (!gameSession) {
    throw new AppError(409, "Game session Not Found");
  }

  if(loginUserId !== gameSession.receiverId.toString()){
    throw new AppError(400, "You have no access to update the status")
  }


  //update the status
  const result = await GameSessionModel.updateOne(
    {
      _id: new ObjectId(gameSessionId),
      receiverId: loginUserId
    },
    {
      status
    }
  )


  
  return result;
}



const getMyGameSessionsService = async (loginUserId: string) => {
  const result = await GameSessionModel.find({
    players: {$in : [loginUserId]}
  })

  return result;
   
}

export { createFriendGameSessionService, createRandomGameSessionService, getMyGameSessionsService, updateSessionStatusService };
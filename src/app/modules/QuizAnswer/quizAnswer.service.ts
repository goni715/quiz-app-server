import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import AppError from "../../errors/AppError";
import FriendModel from "../Friend/friend.model";
import GameSessionModel from "../GameSession/gameSession.model";
import QuizModel from "../Quiz/quiz.model";
import UserModel from "../User/user.model";
import { ISubmitAnswer } from "./quizAnswer.interface";
import QuizAnswerModel from "./quizAnswer.model";
import { Types } from "mongoose";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { HistorySearchFields } from "./quizAnswer.constant";



const submitQuizAnswerService = async (
  loginUserId: string,
  payload: ISubmitAnswer
) => {

  const { friendId, quizId, selectedOption, responseTime} = payload;

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
    responseTime
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


const getMyQuizHistoryService = async (loginUserId: string, query:any) => {

  const ObjectId = Types.ObjectId;

   // 1. Extract query parameters
     const {
       searchTerm, // Text to search
       page = 1, // Default to page 1
       limit = 10, // Default to 10 results per page // Default sort field
       sortOrder = "desc",
       sortBy = "createdAt", // Default sort order
       ...filters // Any additional filters
     } = query;
   
   
     // 2. Set up pagination
     const skip = (Number(page) - 1) * Number(limit);
   
     //3. setup sorting
     const sortDirection = sortOrder === "asc" ? 1 : -1;
   
     //4. setup searching
     let searchQuery = {};
   
     if (searchTerm) {
       searchQuery = makeSearchQuery(searchTerm, HistorySearchFields);
     }
   
    
     //5 setup filters
   
     let filterQuery = {};
     if (filters) {
       filterQuery = makeFilterQuery(filters);
     }


  const result = await QuizAnswerModel.aggregate([
    {
      $match: { userId: new ObjectId(loginUserId) }
    },
    {
      $lookup: {
        from: "quizzes", 
        localField: "quizId", 
        foreignField: "_id",
        as: "quizDetails"
      }
    },
    {
      $unwind: "$quizDetails"
    },
    {
      $project: {
        _id: "$quizId",
        quiz: "$quizDetails.quiz",
        options: "$quizDetails.options",
        answer: "$quizDetails.answer",
        explanation: "$quizDetails.explanation",
        createdAt: "$quizDetails.createdAt",
        isCorrect:1
      }
    }

    //you want to show these field without renaming the field name
    // {
    //   $project: {
    //     _id: 1,
    //     quizId: 1,
    //     selectedOption: 1,
    //     isCorrect: 1,
    //     responseTime: 1,
    //     createdAt: 1,
    //     "quizDetails.quiz": 1,
    //     "quizDetails.options": 1,
    //     "quizDetails.answer": 1,
    //     "quizDetails.explanation": 1,
    //   }
    // }
  ])


  return result;
}


export {
    submitQuizAnswerService,
    getQuizResultsService,
    getMyQuizHistoryService
}
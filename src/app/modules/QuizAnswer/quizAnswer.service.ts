import AppError from "../../errors/AppError";
import GameSessionModel from "../GameSession/gameSession.model";
import QuizModel from "../Quiz/quiz.model";
import { ICalculateXP, ISubmitAnswer, TPlayerXP, TQuizResult, TQuizResults } from "./quizAnswer.interface";
import QuizAnswerModel from "./quizAnswer.model";
import { Types } from "mongoose";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { HistorySearchFields } from "./quizAnswer.constant";



const submitQuizAnswerService = async (
  loginUserId : string,
  payload: ISubmitAnswer
) => {


  const { quizId, selectedOption, responseTime} = payload;


  const quiz = await QuizModel.findById(quizId);
  if (!quiz) {
    throw new AppError(404, "This quizId not found");
  }

  //check gameSession doesn't exist
  const gameSession = await GameSessionModel.findOne({
    players: { $in: [loginUserId] },
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
      $match: { ...searchQuery, ...filterQuery }, // Apply search & filter queries
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


const calculateXPService = async (payload: ICalculateXP) => {

  const { quizResults, playersXP } = payload

  

//   const quizResults = {
//     quiz1Result: [
//         {
//             userId: "67ceb7f91f0adb45a67c9700",
//             quizId: "67cecba4cd8885d418f403ad",
//             isCorrect: true,
//             responseTime: 15,
//             timeLimit: 20,
//             point: 20,
//         },
//         {
//             userId: "67ceb7a50e498c657f204089",
//             quizId: "67cecba4cd8885d418f403ad",
//             isCorrect: false,
//             responseTime: 15,
//             timeLimit: 20,
//             point: 20,
//         },
//     ],
//     quiz2Result: [
//         {
//             userId: "67ceb7a50e498c657f204089",
//             quizId: "67cebd5350c18f87958365aa",
//             isCorrect: true,
//             responseTime: 15,
//             timeLimit: 20,
//             point: 20,
//         },
//         {
//             userId: "67ceb7f91f0adb45a67c9700",
//             quizId: "67cebd5350c18f87958365aa",
//             isCorrect: false,
//             responseTime: 15,
//             timeLimit: 20,
//             point: 20,
//         },
//     ],

// };


// const playersXP = [
// {
//   userId: "67ceb7a50e498c657f204089",
//   XP: 500
// },
// {
//   userId: "67ceb7f91f0adb45a67c9700",
//   XP: 300
// }
// ]



function calculateXP(quizResults: TQuizResults, playersXP: TPlayerXP[]): TPlayerXP[] {
  // Flatten all quiz results into a single array
  const allResults: TQuizResult[] = Object.values(quizResults).flat();

  // Create a map for quick lookup of player XP
  const playerMap = new Map<string, number>(
    playersXP.map((player) => [player.userId, player.XP])
  );

  // Group players by quiz session
  const groupedByQuiz: Record<string, TQuizResult[]> = {};
  allResults.forEach((result) => {
    if (!groupedByQuiz[result.quizId]) {
      groupedByQuiz[result.quizId] = [];
    }
    groupedByQuiz[result.quizId].push(result);
  });

  // Process each quiz session
  Object.values(groupedByQuiz).forEach((players) => {
    if (players.length !== 2) return; // Ensure we only process two-player matches

    const [player1, player2] = players;
    const player1XP = playerMap.get(player1.userId) ?? 0;
    const player2XP = playerMap.get(player2.userId) ?? 0;

    const minXP = Math.min(player1XP, player2XP);
    const maxXP = Math.max(player1XP, player2XP);

    let xpAdjustmentFactor = 1;
    if (maxXP > 0) {
      xpAdjustmentFactor = 1 + (maxXP - minXP) / maxXP; // More XP for fresher player
    }

    let basePoints = 20;

    // Assign XP based on correctness
    if (player1.isCorrect) {
      playerMap.set(player1.userId, player1XP + basePoints * (player1XP < player2XP ? xpAdjustmentFactor : 1));
    }
    if (player2.isCorrect) {
      playerMap.set(player2.userId, player2XP + basePoints * (player2XP < player1XP ? xpAdjustmentFactor : 1));
    }

    // Speed bonus: Faster player gets +5 XP
    if (player1.responseTime < player2.responseTime) {
      playerMap.set(player1.userId, (playerMap.get(player1.userId) ?? 0) + 5);
    } else if (player2.responseTime < player1.responseTime) {
      playerMap.set(player2.userId, (playerMap.get(player2.userId) ?? 0) + 5);
    }
  });

  // Convert updated XP map back to array format
  return Array.from(playerMap, ([userId, XP]) => ({ userId, XP }));
}

// Example usage:
const updatedPlayersXP = calculateXP(quizResults, playersXP);

 
  return updatedPlayersXP

};


export {
    submitQuizAnswerService,
    getQuizResultsService,
    getMyQuizHistoryService,
    calculateXPService
}
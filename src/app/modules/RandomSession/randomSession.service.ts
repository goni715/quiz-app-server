import { Types } from "mongoose";
import QuizModel from "../Quiz/quiz.model";
import RandomSessionModel from "./randomSession.model";
import { TRandomSessionQuery } from "./randomSession.interface";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { RandomSessionSearchFields } from "./randomSession.constant";
import AppError from "../../errors/AppError";



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




const getRandomSesssionsService = async ( loginUserId: string, query: TRandomSessionQuery) => {

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
        searchQuery = makeSearchQuery(searchTerm, RandomSessionSearchFields);
      }
    
     
      //5 setup filters
    
      let filterQuery = {};
      if (filters) {
        filterQuery = makeFilterQuery(filters);
      }

    const result = await RandomSessionModel.aggregate([
      {
        $match: {
          players: { $not: { $in: [new ObjectId(loginUserId)] } },
          status: "active",
        },
      },
      {
        $lookup : {
            from: 'users',
            localField: 'players',
            foreignField: '_id',
            as: 'player'
        }
      },
      {
         $unwind: '$player'
      },
      {
        $match: { ...searchQuery, ...filterQuery }, // Apply search & filter queries
      },
      {
        $project: {
          gameSessionId: "$_id",
          _id:0,
          playerId: "$player._id",
          playerName: "$player.fullName",
          playerEmail: "$player.email",
          status: "$status",
          createdAt: "$createdAt",
        }
      },
      { $skip: skip }, // Pagination - Skip the previous pages
      { $limit: Number(limit) }, // Pagination - Limit the number of results
      { $sort: { [sortBy]: sortDirection } }, // Sorting
    ]);

    // 6. Count total for pagination
    const totalSessionResult = await RandomSessionModel.aggregate([
      {
        $match: {
          players: { $not: { $in: [new ObjectId(loginUserId)] } },
          status: "active",
        },
      },
      {
        $lookup : {
            from: 'users',
            localField: 'players',
            foreignField: '_id',
            as: 'player'
        }
      },
      {
         $unwind: '$player'
      },
      {
        $match: { ...searchQuery, ...filterQuery }, // Apply search & filter queries
      },
      { $count: "totalCount" }, // Count the total number
    ]);

    const totalCount = totalSessionResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / Number(limit));


     return {
       meta: {
         page: Number(page), //currentPage
         limit: Number(limit),
         totalPages,
         total: totalCount,
       },
       data: result,
     };
}


const acceptRandomPlayerService = async (loginUserId: string, gameSessionId: string) => {

  const ObjectId = Types.ObjectId;

  const randomSession = await RandomSessionModel.findOne({
    _id: new ObjectId(gameSessionId),
    players: { $in: [loginUserId] },
    status: "active"
  });

  if(randomSession){
    throw new AppError(400, "You have no access to update the status")
  }


  const result = await RandomSessionModel.updateOne(
    { _id: new ObjectId(gameSessionId) },
    {
      $push: { players: new Types.ObjectId(loginUserId) },
      $set: { status: "accepted" },
    }
  );


  return result;
}



export {
    createRandomSessionService,
    getRandomSesssionsService,
    acceptRandomPlayerService
}
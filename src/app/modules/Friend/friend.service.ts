import { Types } from "mongoose";
import AppError from "../../errors/AppError"
import FriendModel from "./friend.model"
import { TFriendQuery } from "./friend.interface";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { FriendSearchFields } from "./friend.constant";



const makeFriendService = async (loginUserId: string, friendId: string) => {

    if(loginUserId === friendId){
        throw new AppError(409, 'This friendId is your id')
    }

    //check this user is already existed in your friend list
    const friend = await FriendModel.findOne({ friends: {$all: [loginUserId, friendId]} });

    if(friend){
        throw new AppError(409, 'This user is already existed in your friend list')
    }


    //make the friend
    const result = await FriendModel.create({
        friends: [loginUserId, friendId]
    })



    return result;
}



const getMyFriendsService = async (loginUserId: string, query: TFriendQuery) => {
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
    searchQuery = makeSearchQuery(searchTerm, FriendSearchFields);
  }

 
  //5 setup filters

  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }

  //check this user is already existed in your friend list
  const result = await FriendModel.aggregate([
    {
      $match: { friends: { $in: [new ObjectId(loginUserId)] } },
    },
    {
      $unwind: "$friends", // Unwind the friends array to process each friend separately
    },
    {
      $match: { friends: { $ne: new ObjectId(loginUserId) } }, // Exclude the logged-in user
    },
    {
      $lookup: {
        from: "users", // Collection name of users
        localField: "friends",
        foreignField: "_id",
        as: "friendDetails",
      },
    },
    {
      $unwind: "$friendDetails", // Flatten the friendDetails array
    },
    {
      $match: { ...searchQuery, ...filterQuery }, // Apply search & filter queries
    },
    {
      $project: {
        _id: "$friendDetails._id",
        fullName: "$friendDetails.fullName",
        email: "$friendDetails.email",
        country: "$friendDetails.country",
        university: "$friendDetails.university",
        profession: "$friendDetails.profession",
        createdAt: "$createdAt",
      },
    },
    { $skip: skip }, // Pagination - Skip the previous pages
    { $limit: Number(limit) }, // Pagination - Limit the number of results
    { $sort: { [sortBy]: sortDirection } }, // Sorting
  ]);

  // 6. Count total friends for pagination
  const totalFriendsResult = await FriendModel.aggregate([
    { $match: { friends: { $in: [new ObjectId(loginUserId)] } } },
    { $unwind: "$friends" },
    { $match: { friends: { $ne: new ObjectId(loginUserId) } } },
    {
      $lookup: {
        from: "users",
        localField: "friends",
        foreignField: "_id",
        as: "friendDetails",
      },
    },
    { $unwind: "$friendDetails" },
    { $match: { ...searchQuery, ...filterQuery } }, // Apply search & filter queries
    { $count: "totalFriends" }, // Count the total number of matching friends
  ]);

  const totalFriends = totalFriendsResult[0]?.totalFriends || 0;
  const totalPages = Math.ceil(totalFriends / Number(limit));

  return {
    meta: {
      page: Number(page), //currentPage
      limit: Number(limit),
      totalPages,
      total: totalFriends,
    },
    data: result,
  };

  //searchQuery
  //   {
  //     $match: searchQuery
  //         ? {
  //             $or: [
  //                 { "friendDetails.fullName": { $regex: searchQuery, $options: "i" } },
  //                 { "friendDetails.email": { $regex: searchQuery, $options: "i" } }
  //             ]
  //         }
  //         : {}
  //   }


   // 5. Setup filters
  //    let filterQuery: any = {};

  //    if (country) {
  //      filterQuery["friendDetails.country"] = country;
  //    }
  //    if (profession) {
  //      filterQuery["friendDetails.profession"] = profession;
  //    }

}


export {
    makeFriendService,
    getMyFriendsService
}
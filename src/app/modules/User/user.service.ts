import { Types } from "mongoose"
import UserModel from "./user.model";
import FriendModel from "../Friend/friend.model";
import { TUserQuery } from "./user.interface";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { UserSearchFields } from "./user.constant";





const getSuggestedUsersService = async (loginUserId: string, query: TUserQuery) => {
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
    searchQuery = makeSearchQuery(searchTerm, UserSearchFields);
  }

  //5 setup filters

  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }

  //get friendIds
  const data = await FriendModel.aggregate([
    {
      $match: { friends: { $in: [new ObjectId(loginUserId)] } },
    },
    {
      $unwind: "$friends", // Unwind to process each friend separately
    },
    {
      $match: { friends: { $ne: new ObjectId(loginUserId) } }, // Exclude the logged-in user
    },
    {
      $group: {
        _id: null,
        friendIds: { $addToSet: "$friends" }, // Collect friend IDs into an array
      },
    },
    {
      $project: { _id: 0, friendIds: 1 }, // Return only the array of friend IDs
    },
  ]);

  const friendIds = data.length > 0 ? data[0].friendIds : [];

  const result = await UserModel.aggregate([
    {
      $match: {
        _id: {
          $nin: [...friendIds, new ObjectId(loginUserId)],
        },
        role: {
          $ne: "admin",
        },
        ...searchQuery, // Apply search query
        ...filterQuery, // Apply filters
      },
    },
    {
      $project: {
        _id: "$_id",
        fullName: "$fullName",
        email: "$email",
        country: "$country",
        university: "$university",
        profession: "$profession",
        role: "$role",
        createdAt: "$createdAt",
      },
    },
    { $sort: { [sortBy]: sortDirection } }, // Sorting
    { $skip: skip }, // Pagination: Skip previous pages
    { $limit: Number(limit) }, // Pagination: Limit the number of results
  ]);

  // total count of matching users
  const totalCount = await UserModel.countDocuments({
    _id: { $nin: [...friendIds, new ObjectId(loginUserId)] },
    role: { $ne: "admin" },
    ...searchQuery,
    ...filterQuery,
  });

  return {
    meta: {
      page: Number(page), //currentPage
      limit: Number(limit),
      totalPages: Math.ceil(totalCount / Number(limit)),
      total: totalCount,
    },
    data: result,
  };
}



export {
    getSuggestedUsersService,
}

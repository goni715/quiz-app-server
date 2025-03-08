import { Types } from "mongoose";
import AppError from "../../errors/AppError"
import FriendModel from "./friend.model"



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



const getMyFriendsService = async (loginUserId: string) => {

    const ObjectId = Types.ObjectId;

    //check this user is already existed in your friend list
    const result = await FriendModel.aggregate([
        {
            $match: {friends: {$in: [ new ObjectId(loginUserId)]}}
        },
        {
            $unwind: "$friends" // Unwind the friends array to process each friend separately
        },
        {
            $match: { friends: { $ne: new ObjectId(loginUserId) } } // Exclude the logged-in user
        },
        {
            $lookup: {
                from: "users", // Collection name of users
                localField: "friends",
                foreignField: "_id",
                as: "friendDetails"
            }
        },
        {
            $unwind: "$friendDetails" // Flatten the friendDetails array
        },
        {
            $project: {
                _id: "$friendDetails._id",
                fullName: "$friendDetails.fullName",
                email: "$friendDetails.email",
                country: "$friendDetails.country",
                profession: "$friendDetails.profession",
                createdAt: "$createdAt"
            }
        }
    ]);


    return result;
}


export {
    makeFriendService,
    getMyFriendsService
}
import { Types } from "mongoose"
import UserModel from "./user.model";
import FriendModel from "../Friend/friend.model";





const getSuggestedUsersService = async (loginUserId: string) => {
    const ObjectId = Types.ObjectId;

    const data = await FriendModel.aggregate([
        {
            $match: { friends: { $in: [new ObjectId(loginUserId)] } }
        },
        {
            $unwind: "$friends" // Unwind to process each friend separately
        },
        {
            $match: { friends: { $ne: new ObjectId(loginUserId) } } // Exclude the logged-in user
        },
        {
            $group: { 
                _id: null, 
                friendIds: { $addToSet: "$friends" } // Collect friend IDs into an array
            }
        },
        {
            $project: { _id: 0, friendIds: 1 } // Return only the array of friend IDs
        }
    ]);

    const friendIds = data.length > 0 ? data[0].friendIds : [];

    return friendIds;
    
   const result = await UserModel.aggregate([
    {
        $match: {
            _id : {
                $ne: new ObjectId(loginUserId)
            },
            role: {
                $ne: 'admin'
            }
        }
    }
   ])

   return result;
}



const getFriendsService = async (loginUserId: string) => {
    const ObjectId = Types.ObjectId;

   const result = await UserModel.aggregate([
    {
        $match: {
            _id : {
                $ne: new ObjectId(loginUserId)
            },
            role: {
                $ne: 'admin'
            }
        }
    }
   ])

   return result;
}


export {
    getSuggestedUsersService,
    getFriendsService
}

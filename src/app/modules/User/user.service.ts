import { Types } from "mongoose"
import UserModel from "./user.model";





const getSuggestedUsersService = async (loginUserId: string) => {
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

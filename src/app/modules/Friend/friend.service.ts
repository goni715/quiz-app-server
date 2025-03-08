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


export {
    makeFriendService
}
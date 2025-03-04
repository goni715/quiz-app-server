import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    profession: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})








const UserModel = model<IUser>('User', userSchema);
export default UserModel;


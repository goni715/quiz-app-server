import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import hashedPassword from "../../utils/hashedPassword";


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
        select:0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
    versionKey: false
})




//Hash Password before saving
userSchema.pre("save", async function (next) {
    const user = this; //this means user
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
  
    user.password = await hashedPassword(user.password);
    next();
  });



const UserModel = model<IUser>('User', userSchema);
export default UserModel;


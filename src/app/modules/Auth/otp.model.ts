import { model, Schema } from "mongoose";
import { IOtp } from "./auth.interface";


const OtpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    otp: {
      type: String,
      required: [true, "otp is required"],
      trim: true,
      maxlength: 4,
      minlength: 4
    },
    status: {
      type: Number,
      default: 0,
    },
    otpExpires: {
      type: Date,
      default: () => new Date(+new Date() + 600000), // 10 minutes // OTP Code Will be expired within 10 minutes
    },
  },
  { timestamps: true, versionKey: false }
);

const OtpModel = model<IOtp>("Otp", OtpSchema);
export default OtpModel;
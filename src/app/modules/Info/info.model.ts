import { model, Schema } from "mongoose";
import { IInfo } from "./info.interface";

const infoSchema = new Schema<IInfo>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    explainOne: {
      type: String,
      required: true,
    },
    explainTwo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InfoModel = model<IInfo>("Info", infoSchema);
export default InfoModel;

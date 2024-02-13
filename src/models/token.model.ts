import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

export interface IToken extends Document {
  refreshToken: string;
  user?: IUser["_id"];
}

const tokenSchema: Schema = new Schema(
  {
    refreshToken: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

interface ITokenModel extends Model<IToken> {}
const Token: ITokenModel = mongoose.model<IToken, ITokenModel>(
  "Token",
  tokenSchema,
);

export default Token;

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  userName: string;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface IUserModel extends Model<IUser> {}
const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;

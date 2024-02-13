import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

export interface IDestination extends Document {
  request: string;
  response: string;
  user?: IUser["_id"];
}

const destinationSchema: Schema = new Schema(
  {
    request: {
      type: String,
    },
    response: {
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

interface IDestinationModel extends Model<IDestination> {}
const Destination: IDestinationModel = mongoose.model<
  IDestination,
  IDestinationModel
>("Destination", destinationSchema);

export default Destination;

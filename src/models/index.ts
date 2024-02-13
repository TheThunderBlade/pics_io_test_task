import { Model } from "mongoose";
import { IUser } from "./user.model";
import { IToken } from "./token.model";
import { IDestination } from "./destination.model";
import User from "./user.model";
import Token from "./token.model";
import Destination from "./destination.model";

interface IModels {
  User: Model<IUser>;
  Token: Model<IToken>;
  Destination: Model<IDestination>;
}

const models: IModels = {
  User,
  Token,
  Destination,
};

export default models;

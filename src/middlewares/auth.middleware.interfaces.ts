import { Request } from "express";
import { IUser } from "../models/user.model";

export interface IAuthRequest extends Request {
  user: IUser | null;
}

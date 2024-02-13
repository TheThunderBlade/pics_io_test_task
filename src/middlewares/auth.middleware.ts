import jwt from "jsonwebtoken";
import db from "../models";
import express, { NextFunction } from "express";
import { ITokenPayload } from "../services/token.service.interfaces";
import { IAuthRequest } from "./auth.middleware.interfaces";
import { IUser } from "../models/user.model";

export default async function (
  req: IAuthRequest,
  res: express.Response,
  next: NextFunction,
) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token =
      req.headers["x-access-token"] ||
      req.headers.Authorization ||
      req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided!" });
    }

    const decoded = jwt.verify(
      token.toString(),
      process.env.JWT_ACCESS_SECRET!.toString(),
    ) as ITokenPayload;
    const user: IUser | null = await db.User.findOne({ _id: decoded.userId });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
}

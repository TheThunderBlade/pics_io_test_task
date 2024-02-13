import apiError from "../services/error.service";
import express, { NextFunction } from "express";

export default function (
  err: apiError,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) {
  try {
    console.log(err);
    if (err instanceof apiError) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        isError: err.isError,
      });
    }
    return res.status(500).json({ message: "Unexpected error" });
  } catch (e) {
    next(e);
  }
}

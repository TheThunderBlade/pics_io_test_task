import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@mongo:27017/${process.env.DB_NAME}`;

const connectDb = async (): Promise<void> => {
  await mongoose
    .connect(url)
    .catch((err: mongoose.Error) => {
      if (err) {
        console.error("Error connecting to MongoDB:", err);
      }
    })
    .finally(() => {
      console.log("Connected to MongoDB");
    });
};

export default connectDb;

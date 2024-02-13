import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import connectDb from "./config/db";
import router from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use("/api", router);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});

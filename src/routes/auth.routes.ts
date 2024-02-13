import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signUp", authController.registration);
authRoutes.post("/signIn", authController.login);
authRoutes.get("/refresh", authController.refresh);
authRoutes.get("/logout", authController.logout);

export default authRoutes;

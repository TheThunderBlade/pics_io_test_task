import { Application, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import destinationController from "../controllers/destination.controller";

const destinationRoutes: Router = Router();

destinationRoutes.post(
  "/destination",
  <Application>authMiddleware,
  destinationController.destinationProcessing,
);

export default destinationRoutes;

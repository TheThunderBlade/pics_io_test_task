import { Application, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import elasticUserController from "../controllers/elasticUser.controller";

const elasticUserRoutes: Router = Router();

elasticUserRoutes.post(
  "/elastic/insert",
  <Application>authMiddleware,
  <Application>elasticUserController.insertUserDataset
);

elasticUserRoutes.post(
  "/elastic/get",
  <Application>authMiddleware,
  <Application>elasticUserController.getUserDataset
);

export default elasticUserRoutes;

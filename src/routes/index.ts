import { Router } from "express";
import authRoutes from "./auth.routes";
import destinationRoutes from "./destination.routes";
import elasticUserRoutes from "./elasticUser.routes";

const router = Router();

router.use(authRoutes);
router.use(destinationRoutes);
router.use(elasticUserRoutes);

export default router;

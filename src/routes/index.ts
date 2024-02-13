import { Router } from "express";
import authRoutes from "./auth.routes";
import destinationRoutes from "./destination.routes";

const router = Router();

router.use(authRoutes);
router.use(destinationRoutes);

export default router;

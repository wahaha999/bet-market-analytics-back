import express from "express"
import timeRoutes from "./time"
import dimensionRoutes from "./dimension"
const router = express.Router();

router.use("/time", timeRoutes);
router.use("/dimension",dimensionRoutes);

export default router;
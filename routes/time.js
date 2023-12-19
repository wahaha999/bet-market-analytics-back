import express from "express";
import {timecontroller} from "../controllers";
const router = express.Router();

router.get("/test", timecontroller.getTest);
router.get("/bet", timecontroller.getBetTrend);
router.get("/bet_profit", timecontroller.getBetTrendProfit);

export default router;
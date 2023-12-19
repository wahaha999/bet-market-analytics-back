import express from "express";
import { dimensioncontroller } from "../controllers";
const router = express.Router();

router.get("/country", dimensioncontroller.getCountryTrend)
router.get("/currency", dimensioncontroller.getCurrencyTrend)
router.get("/client", dimensioncontroller.getClientTrend)
router.get("/stat", dimensioncontroller.getStatTypeTrend)
router.get("/game", dimensioncontroller.getGameTypeTrend)
router.get("/player", dimensioncontroller.getPlayerTrend)
router.get("/clientplayer", dimensioncontroller.getClientPlayerBet)

export default router;
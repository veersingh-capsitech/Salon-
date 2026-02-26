import express from "express";
import { getSalon,approveSalon,toggleSalonStatus } from "../controllers/salonsControllers.js";
import {verifyToken} from "../middlewares/verifyToken.js"

const router =express.Router();

router.get("/salon",verifyToken,getSalon );
router.patch("/salon/:id/approve",verifyToken, approveSalon);
router.patch("/salon/:id/toggle",verifyToken, toggleSalonStatus);

export default router
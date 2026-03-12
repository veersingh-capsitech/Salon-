import express from "express";
import {
  getSalon,
  getSalonById,
  approveSalon,
  toggleSalonStatus,
  updateSalonById,
} from "../controllers/salonsControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/salon", verifyToken, getSalon);
router.get("/salon/:id", verifyToken, getSalonById);
router.patch("/salon/:id/approve", verifyToken, approveSalon);
router.patch("/salon/:id/toggle", verifyToken, toggleSalonStatus);
router.patch("/salon/:id", verifyToken, updateSalonById);

export default router;

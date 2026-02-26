import express from "express";
import {
  getServices,
  addService,
  updateService
} from "../controllers/servicesControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();

router.get("/services",verifyToken, getServices);
router.post("/services", verifyToken, addService);
router.put("/services/:id", verifyToken, updateService);

export default router;

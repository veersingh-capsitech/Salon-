import express from "express";
import { GetUsers } from "../controllers/UserControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router =express.Router();

router.get("/users",verifyToken,GetUsers)


export default router
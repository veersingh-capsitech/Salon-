import express from "express";
import { salonSignup, Login, Signup } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/salonSignup", salonSignup);
router.post("/login", Login);
router.post("/signup", Signup);

export default router;

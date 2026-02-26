import express from "express"
import { salonSignup,Login,Singup } from "../controllers/authControllers.js";

const router =express.Router();

router.post("/salonSignup" ,salonSignup);
router.post("/login",Login);
router.post("/signup",Singup);



export default router;

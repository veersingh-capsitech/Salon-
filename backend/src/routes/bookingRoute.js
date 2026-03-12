import express from "express";
import{ getBookings ,createBooking,updateBooking} from "../controllers/bookingControllers.js";

const router = express.Router();

router.get("/bookings", getBookings);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
export default router;
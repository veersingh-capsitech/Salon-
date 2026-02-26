import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoute from "./src/routes/UserRoute.js";
import salonRoute from "./src/routes/salonRoute.js";
import authRoute from "./src/routes/authRoute.js";
import employeeRoute from "./src/routes/employeeRoute.js";
import servicesRoute from "./src/routes/servicesRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/auth", salonRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth", employeeRoute);
app.use("/api/auth", servicesRoute);

connectDB();
app.listen(PORT);

import express from "express";
import {
  getEmployee,
  addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeeControllers.js";
import {verifyToken} from "../middlewares/verifyToken.js"

const router = express.Router();

router.get("/employees",verifyToken, getEmployee);
router.post("/employees", verifyToken, addEmployee);
router.put("/employees/:id", verifyToken, updateEmployee);
router.delete("/employees/:id", verifyToken, deleteEmployee);

export default router;

import Employee from "../models/employeeModel.js";
import bcrypt from "bcrypt";


export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addEmployee = async (req, res) => {
  try {
    const { fullName, email, salonId, Services, isActive } = req.body;
    // console.log(req.body)

    if (!fullName || !email || !salonId || !Services) {
      return res.status(400).json({
        message: "FullName, Email, SalonId, and Services required",
      });
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const defaultPassword = "Employee@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const employee = await Employee.create({
      fullName,
      email,
      Services,
      salonId,
      isActive: isActive ?? true,
      password: hashedPassword,
      role: "employee",
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee,
      defaultPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, salonId, Services, isActive } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { fullName, email, salonId, Services, isActive },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await Employee.findByIdAndDelete(id);
    // res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import User from "../models/users.js";
import Customer from "../models/customerModel.js";
import Salon from "../models/salonModel.js";
import Employee from "../models/employeeModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import employeeModel from "../models/employeeModel.js";

dotenv.config();
const secret_key = process.env.JWT_SECRET;

export const Signup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { fullName, role, email, phone, password } = req.body;

    if (!fullName || !role || !email || !phone || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      role,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    if (role === "customer") {
      await Customer.create({
        fullName,
        email,

        password: hashedPassword,
      });
    }

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      secret_key,
      { expiresIn: "1d" },
    );
    if (user.role === "SuperAdmin") {
      const allUsers = await User.find().select("-password");
      return res.status(200).json({
        message: "SuperAdmin login successful",
        token,
        role: user.role,
        users: allUsers,
      });
    }

    if (user.role === "Admin") {
      const allUsers = await User.find().select("-password");

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: user.role,
        users: allUsers,
        salonId: user.salonId,
      });
    }
    
    if (user.role === "employee") {
      const employee = await employeeModel.findOne({ email: user.email });
      if (!employee) {
        return res.status(404).json({ message: "Employee details not found" });
      }
      const salon = await Salon.findById(employee.salonId);
      return res.status(200).json({
        message: "Employee login successful",
        token,
        role: user.role,
        
        employee: {
          id: employee._id,
          salonName: salon ? salon.salonName : "N/A",
          services: employee.Services,
        }
      });
    }
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const salonSignup = async (req, res) => {
  try {
    const { salonName, ownerName, email, phone, address, password } = req.body;

    if (!salonName || !ownerName || !email || !phone || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingSalon = await Salon.findOne({ email });
    if (existingSalon) {
      return res.status(409).json({ message: "Salon already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const workingHours = {
      Mon: "09:00 - 18:00",
      Tue: "09:00 - 18:00",
      Wed: "09:00 - 18:00",
      Thu: "09:00 - 16:00",
      Fri: "09:00 - 18:00",
      Sat: "10:00 - 18:00",
      Sun: "Closed",
    };

    const salon = await Salon.create({
      salonName,
      ownerName,
      email,
      phone,
      address,
      password: hashedPassword,
      role: "Admin",
      isApproved: false,
      hours: workingHours,
    });

    res.status(201).json({
      message: "Salon registered successfully. Await admin approval.",
      salon: {
        id: salon._id,
        salonName: salon.salonName,
        email: salon.email,
        role: salon.role,
        isApproved: salon.isApproved,
      },
    });
  } catch (error) {
    console.error("Salon signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

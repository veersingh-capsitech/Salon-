import Customer from "../models/users.js";


export const GetUsers = async (req, res) => {
  try {
    const users = await Customer.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get salon error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
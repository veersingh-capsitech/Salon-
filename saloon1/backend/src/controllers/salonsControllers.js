import Salon from "../models/salonModel.js";
import Customer from "../models/users.js";

export const getSalon = async (req, res) => {
  try {
    const salons = await Salon.find().select("-password");
    res.status(200).json(salons);
  } catch (error) {
    console.error("Get salon error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const approveSalon = async (req, res) => {
  try {
    const salonId = req.params.id;
    console.log(salonId)

    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (salon.isApproved) {
      return res.status(400).json({ message: "Salon already approved" });
    }

    salon.isApproved = true;
    await salon.save();

    const user = await Customer.create({
      fullName: salon.ownerName,
      email: salon.email,
      phone: salon.phone,
      password: salon.password,
      role: "Admin",
      salonId: salon._id,
    });

    res.status(200).json({
      message: "Salon approved and user created",
      userId: user._id,
    });
  } catch (error) {
    console.error("Approve salon error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const toggleSalonStatus = async (req, res) => {
  try {
    const salonId = req.params.id;
    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    salon.isActive = !salon.isActive;
    await salon.save();
    res.status(200).json({ message: "Salon status toggled", isActive: salon.isActive });
  }catch(error){
    res.status(500).json({ message: "Server error" });

  }

}
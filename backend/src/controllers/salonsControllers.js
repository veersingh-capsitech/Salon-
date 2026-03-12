import Salon from "../models/salonModel.js";
import Customer from "../models/users.js";

export const getSalon = async (req, res) => {
  try {
    const salons = await Salon.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "services",
          foreignField: "_id",
          as: "services",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employees",
          foreignField: "_id",
          as: "employees",
        },
      },
      {
        $project: {
          salonName: 1,
          ownerName: 1,
          email: 1,
          phone: 1,
          address: 1,
          description: 1,
          hours: 1,
          image: 1,
          isApproved: 1,
          isActive: 1,
          services: 1,
          employees: 1,
        },
      },
    ]);
    res.status(200).json(salons);
  } catch (error) {
    console.error("Get salon error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSalonById = async (req, res) => {
  try {
    const salonId = req.params.id;
    const salon = await Salon.findById(salonId)
      .populate("services")
      .populate("employees");
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.status(200).json(salon);
  } catch (error) {
    console.error("Get salon by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const approveSalon = async (req, res) => {
  try {
    const salonId = req.params.id;
    console.log(salonId);

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
    res
      .status(200)
      .json({ message: "Salon status toggled", isActive: salon.isActive });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSalonById = async (req, res) => {
  try {
    const salonId = req.params.id;
    const updateData = req.body;
    const salon = await Salon.findByIdAndUpdate(salonId, updateData, { new: true });
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.status(200).json({ message: "Salon updated", salon });
  } catch (error) {
    console.error("Update salon erroe:",error);
    res.status(500).json({ message: "Server error" });
  }
};

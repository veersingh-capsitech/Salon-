import mongoose from "mongoose";

const salonSchema = new mongoose.Schema(
  {
    salonName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Admin",
      immutable: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    hours: {
      type: Map,
      of: String,
      default: {
        Mon: "09:00 - 18:00",
        Tue: "09:00 - 18:00",
        Wed: "09:00 - 18:00",
        Thu: "09:00 - 16:00",
        Fri: "09:00 - 18:00",
        Sat: "10:00 - 18:00",
        Sun: "Closed",
      },
    },
    services: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      ],
      default: [],
    },
    employees: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },
      ],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Salon = mongoose.model("Salon", salonSchema);
export default Salon;

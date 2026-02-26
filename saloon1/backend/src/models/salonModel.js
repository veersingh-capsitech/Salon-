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
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        durationMin: { type: Number, default: 30 },
      },
    ],
    employees: [
      {
        fullName: { type: String, required: true },
        email: { type: String, lowercase: true },
        isActive: { type: Boolean, default: true }, 
        specialties: [{ type: String }], 
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Salon = mongoose.model("Salon", salonSchema);
export default Salon;

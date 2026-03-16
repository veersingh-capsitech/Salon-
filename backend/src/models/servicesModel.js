import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true },
);

// Ensure service names are unique per salon (same name can exist across different salons)
serviceSchema.index({ name: 1, salonId: 1 }, { unique: true });

export default mongoose.model("Service", serviceSchema);

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

export default mongoose.model("Service", serviceSchema);

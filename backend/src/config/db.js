import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // mongoose.set("autoIndex", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

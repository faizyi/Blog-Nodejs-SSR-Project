import mongoose from "mongoose";
import { configs } from "../config/index.js";
const connectToDB = async () => {
    try {
      await mongoose.connect(configs.db);
      console.log("Connected to MongoDB database successfully.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
export default connectToDB
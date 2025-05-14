import mongoose from "mongoose";
export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
};

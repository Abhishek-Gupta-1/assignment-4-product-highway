import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL } = process.env;
console.log("PRINT: " + MONGODB_URL);

export const connectDB = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Success"))
    .catch((err) => {
      console.log("DB Connection Failed");
      process.exit(1);
    });
};
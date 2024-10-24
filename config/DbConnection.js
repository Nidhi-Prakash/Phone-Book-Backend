import { mongoose } from "mongoose";
import "dotenv/config";

export const createDbConnection = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_DB_URL);
  } catch {
    console.log("Error while connecting to DB");
  }
};

import mongoose from "mongoose";
const MONGOURI = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGOURI, { dbName: dbname });
    console.log("connect mongodb sucessfully");
  } catch (error) {
    console.error("mongodb connection error:", error);
    process.exit(1);
  }
};
export default connectToMongo;

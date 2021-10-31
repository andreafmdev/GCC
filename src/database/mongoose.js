import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { LOCAL_DB } = process.env;
mongoose
  .connect(LOCAL_DB)
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error in Db ", err);
  });
export default mongoose;

import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(data.connection.host);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectDb, 5000);
    });
};

export default connectDb;

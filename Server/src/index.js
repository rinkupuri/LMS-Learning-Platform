import connectDb from "./config/db.js";
import { app } from "./server.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listining on https://localhost:${process.env.PORT}`);
  connectDb();
});

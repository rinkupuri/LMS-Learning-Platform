import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const connectRedis = () => {
  if (process.env.REDIS_URL) {
    console.log("Connecting to Redish");
    return process.env.REDIS_URL;
  } else {
    console.log("Redish Url Not Found");
  }
};
export const redis = new Redis(connectRedis());

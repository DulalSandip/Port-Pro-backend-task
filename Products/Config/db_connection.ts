import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;

const databaseConnection = (): void => {
  mongoose
    .connect(mongodb_uri as string, {} as ConnectOptions)
    .then(() => {
      console.log("Mongodb connected to PORT_PRO product database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Mongodb db couldnt be connect at this moment");
    });
};

export default { databaseConnection };

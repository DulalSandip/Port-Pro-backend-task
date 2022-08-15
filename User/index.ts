import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";

//? Routes call
import userRoute from "./Routes/User.Auth.Routes";

// database connection
const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri as string, {} as ConnectOptions)
  .then(() => {
    console.log("Mongodb connected to PORT_PRO User database");
  })
  .catch((err) => {
    console.log(err);
    console.log("Mongodb db couldnt connecte");
  });

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(morgan("dev"));

//?user Routes
app.use("/api", userRoute);

app.use("/api/user", (req: Request, res: Response): void => {
  res.status(200).json({
    status: true,
    message: "Welcome to user page",
  });
});

app.listen(PORT, async () => {
  console.log(`Server running succesfully on port ${PORT}`);
});

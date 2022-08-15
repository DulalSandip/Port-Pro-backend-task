import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";

//? Routes call
import productRoutes from "./Routes/Product.Routes";
// database connection
const mongodb_uri = process.env.MONGODB_URI;

mongoose
  .connect(mongodb_uri as string, {} as ConnectOptions)
  .then(() => {
    console.log("Mongodb connected to PORT_PRO Product database");
  })
  .catch((err) => {
    console.log(err);
    console.log("Mongodb db couldnt connected at this moment");
  });


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("dev"));


//? Product Routes
app.use("/api",  productRoutes);

app.use("/api/products", (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: "This is products",
  });
});

app.listen(PORT, (): void => {
  console.log(`Server running succesfully on port ${PORT}`);
});

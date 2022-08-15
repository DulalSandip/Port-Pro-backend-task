import { Schema, model, Document, PopulatedDoc, Types } from "mongoose";
import UserModel from "../../User/Models/User.Models";
import { UserInterface } from "../../User/Models/User.Models";

export interface ProductsInterface extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  finalPrice: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// interface UserInterface {
//   name?: string;
// }

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: [3, "Name should at least 3 characters long"],
    max: [300, "Name cannot exceed more than 300 characters"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
});

const ProductModel = model<ProductsInterface>("product", productSchema);
export default ProductModel;

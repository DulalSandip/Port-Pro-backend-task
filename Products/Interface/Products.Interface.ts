import { Schema } from "mongoose";

declare interface ProductsInterface {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  finalPrice: number;
  createdBy?: string;
}
export default ProductsInterface;

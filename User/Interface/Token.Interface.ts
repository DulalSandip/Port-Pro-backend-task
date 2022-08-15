import { Schema } from "mongoose";

declare interface TokenInterface {
  _id: Schema.Types.ObjectId;
  expiresIn: number;
}

export default TokenInterface;

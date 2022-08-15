import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  password: string;
  token: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    // required: true,
  },

  email: {
    type: String,
    trim: true,
    // required: true,
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user"],
  },
  createdAt: {
    type: String,
    trim: true,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    trim: true,
    default: Date.now(),
  },
});

const UserModel = model<UserInterface>("user", userSchema);
export default UserModel;

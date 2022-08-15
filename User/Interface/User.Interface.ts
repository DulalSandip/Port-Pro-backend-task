import { Schema } from "mongoose";
declare interface UserInterface {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  password: string;
  token: string;
  role: string;
  //   createdAt: string;
  //   updatedAt: string;
}

export default UserInterface;

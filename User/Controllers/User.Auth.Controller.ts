import dotenv from "dotenv";
dotenv.config();
import UserModel from "../Models/User.Models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import jwttoken from "../Auth Middleware/Auth.Middleware";
import UserInterface from "../Interface/User.Interface";
import UserDto from "../DTO/User.Auth.Dto";

//post req -> sign in
const registerUser = async (req: Request, res: Response) => {
  try {
    //check if email already exists or not
    const { email, phone, name, password }: UserInterface = req.body;
    const value = email ? { email } : { phone };
    const checkUser = await UserModel.findOne({
      ...value,
    });
    if (checkUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    } else {
      // Hash user Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create user object with user model
      const newUser = new UserModel({
        email,
        phone,
        name,
        password: hashedPassword,
      });
      const token = jwttoken.createJwtToken(newUser._id, newUser.role);
      newUser.token = token;

      const saveUser = await newUser.save();
      const userDto = new UserDto(saveUser);
      if (saveUser) {
        return res.status(201).json({
          status: true,
          message: "Your account is registered",
          user: userDto,
        });
      }

      return res.status(400).json({
        status: false,
        message: "Account couldnt be registered at this moment.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

//get req -> fetching details

const getUserByToken = async (req: Request, res: Response) => {
  try {
    if (req.params.token) {
      const user = await UserModel.findOne({ token: req.params.token });
      if (user) {
        return res.status(200).json({
          status: true,
          message: `Hey ${user.name},Your details are listed.`,
          user,
        });
      } else {
        return res.status(404).json({
          staus: false,
          message: "Invalid user.User doesnt exists",
        });
      }
    } else {
      return res.status(400).json({
        staus: false,
        message: "Token is required field",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export default {
  registerUser,
  getUserByToken,
};

import dotenv from "dotenv";
dotenv.config();
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwt_token_key = process.env.JWT_TOKEN_KEY;
// const jwt_token_key = "portpro";

console.log(jwt_token_key, "tokens");
//? Generate this token during registration process
const createJwtToken = (_id: any, role: any) => {
  // Json web token generate

  return jwt.sign(
    {
      _id: _id,
      role: role,
    },
    jwt_token_key as jwt.Secret,
    {
      expiresIn: "7d",
    }
  );
};

//? verify the token

const requireSignin = (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, jwt_token_key as jwt.Secret);

      if (user) {
        req.user = user;
      }
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Invalid tokenssssss.",
    });
  }
};
// only user can login

const userMiddleware = (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  if (req.user.role !== "user") {
    return res.status(401).json({
      status: false,
      message: "User Access Denied...",
    });
  }
  next();
};

export default {
  createJwtToken,
  requireSignin,
  userMiddleware,
};

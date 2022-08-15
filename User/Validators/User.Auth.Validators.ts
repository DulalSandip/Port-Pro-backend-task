import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validateRegister = [
  //check name validation
  check("name")
    .isLength({ min: 3, max: 40 })
    .withMessage("Name should be at least 3 characters long")
    .matches(/^[\s\w\.\,]+$/)
    .withMessage("XSS attack doesn't support here")
    .matches(/^[a-zA-Z0-9 ]{2,25}$/)
    .withMessage("Name should be in alphabet/number")
    .not()
    .isEmpty()
    .trim()
    .escape(),

  //check password validation
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be an atleast 4 characters long")
    .matches("[0-9]")
    .withMessage("Password must contain a number")
    .matches("[A-Z]")
    .withMessage("Password must contain an Upercase letter")
    .not()
    .isEmpty()
    .trim()
    .escape(),

  // check email
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email or malicious activities traced... ")
    .optional({
      checkFalsy: true,
      nullable: false,
    }),
  // check phone
  check("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number should be 10 number")
    .matches("[0-9]")
    .withMessage("Mobile number should be between 0-9")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .optional({
      checkFalsy: true,
      nullable: false,
    }),
];

const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  // check errors is not empty
  if (!errors.isEmpty()) {
    let newErrors = "";
    errors.array().forEach(({ msg }) => {
      newErrors = newErrors + msg + ".";
    });
    return res.status(400).json({
      status: false,
      //   errors: errors.array(),
      message: newErrors,
    });
  }
  next();
};

export default {
  validateRegister,
  isRequestValidated,
};

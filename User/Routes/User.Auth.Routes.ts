import express from "express";
const router = express();
import controllers from "../Controllers/User.Auth.Controller";
import authValidator from "../Validators/User.Auth.Validators";

router.post(
  "/auth/user/register",
  authValidator.validateRegister,
  authValidator.isRequestValidated,
  controllers.registerUser
);
router.get(
  "/auth/user/list/:token",

  controllers.getUserByToken
);

export default router;

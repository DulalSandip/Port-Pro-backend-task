import express from "express";
const router = express();
import productController from "../Controllers/Product.Controllers";
import authMiddleware from "../../User/Auth Middleware/Auth.Middleware";

router.post(
  "/create/product",
  authMiddleware.requireSignin,
  authMiddleware.userMiddleware,
  productController.createProduct
);

//authorized user can only see their uploaded product
router.get(
  "/list/product",
  authMiddleware.requireSignin,
  authMiddleware.userMiddleware,
  productController.getAuthorizedProduct
);

// fetching all the product without authorization
router.get("/list/allproduct", productController.getAllProduct);

export default router;

import express, { Request, Response } from "express";
import ProductModel from "../Models/Products.Models";
import ProductsInterface from "../Interface/Products.Interface";

const createProduct = async (req: Request | any, res: Response) => {
  try {
    const { _id, name, description, price, discountPrice } = req.body;
    const bodyValue: ProductsInterface = {
      _id,
      name,
      description,
      price,
      discountPrice,
      finalPrice: price - discountPrice,
      createdBy: req.user._id,
    };

    const product = await ProductModel.create(bodyValue);
    if (product) {
      return res.status(201).json({
        status: true,
        message: "product created succesfully",
        product,
      });
    } else {
      return res.status(400).json({
        staus: false,
        message: "Product couldn'nt be added at this moment",
      });
    }
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

// user can see their uploaded products with token set in the authorization
const getAuthorizedProduct = async (req: Request | any, res: Response | any) => {
  try {
    const product = await ProductModel.findOne({
      createdBy: req.user._id,
    });

    if (product) {
      return res.status(200).json({
        status: true,
        message: `Hey , Your product has been listed`,
        product,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

// All products list
const getAllProduct = async (req: Request | any, res: Response | any) => {
  try {
    const product = await ProductModel.find({});

    if (product) {
      return res.status(200).json({
        status: true,
        message: `All products are listed`,
        product,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export default {
  createProduct,
  getAuthorizedProduct,
  getAllProduct,
};

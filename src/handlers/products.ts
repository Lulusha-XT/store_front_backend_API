import express, { Request, Response, Router } from "express";
import { Product, ProductStore } from "../models/products";
import { verifyToken } from "../utils/verifyToken";

const productStore = new ProductStore();

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const order: Product = {
      product_name: req.body.product_name,
      price: parseInt(req.body.price),
    };
    const newOrder = await productStore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const allPrdouct = await productStore.index();
    res.json(allPrdouct);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productStore.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const product_router = (router: Router) => {
  router.get("/", getAllProduct);
  router.post("/", verifyToken, addNewProduct);
  router.get("/:id", verifyToken, getProduct);
};

export default product_router;

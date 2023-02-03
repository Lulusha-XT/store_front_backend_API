import express, { Router } from "express";
import product_router from "../../handlers/products";

const productRouter: express.Router = express();
product_router(productRouter);

export default productRouter;

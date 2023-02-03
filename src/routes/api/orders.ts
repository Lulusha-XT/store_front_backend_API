import express, { Router } from "express";
import order_router from "../../handlers/orders";

const orderRouter: express.Router = express();
order_router(orderRouter);

export default orderRouter;

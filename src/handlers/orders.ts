import express, { Request, Response, Router } from "express";
import { Order, OrderStore } from "../models/orders";
import { verifyToken } from "../utils/verifyToken";

const orderStore = new OrderStore();

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await orderStore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const allPrdouct = await orderStore.index();
    res.json(allPrdouct);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const addNewOrderdProduct = async (req: Request, res: Response) => {
  try {
    const neOrderdProduct = await orderStore.createOrderProduct(
      parseInt(req.body.quantity),
      parseInt(req.body.product_id),
      parseInt(req.body.order_id)
    );
    res.json(neOrderdProduct);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const getAllOrderdProduct = async (req: Request, res: Response) => {
  try {
    const allPrdouct = await orderStore.indexOrderProduct();
    res.json(allPrdouct);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const showCompletedOrder = async (req: Request, res: Response) => {
  try {
    const completOrder = await orderStore.showCommpletedOrder(
      parseInt(req.params.userId)
    );
    res.json(completOrder);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const showCurrentOrder = async (req: Request, res: Response) => {
  try {
    const currentOrder = await orderStore.showCurrentOrder(
      parseInt(req.params.userId)
    );
    res.json(currentOrder);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};
const order_router = (router: Router) => {
  router.get("/", verifyToken, getAllOrder);
  router.post("/", verifyToken, addNewOrder);
  router.get("/orderdproduct", verifyToken, getAllOrderdProduct);
  router.post("/orderdproduct", verifyToken, addNewOrderdProduct);
  router.get("/completorder/:userId", verifyToken, showCompletedOrder);
  router.get("/currentorder/:userId", verifyToken, showCurrentOrder);
};

export default order_router;

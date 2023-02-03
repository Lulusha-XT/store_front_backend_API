import express, { Request, Response, Router } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const dashboard_routes = (app: Router) => {
  app.get("/five-most-expensive", fiveMostExpensive);
  app.get("/products-in-orders", productsInOrders);
  app.get("/users-with-orders", usersWithOrders);
};

export default dashboard_routes;

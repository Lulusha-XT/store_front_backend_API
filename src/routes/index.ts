import express, { Router } from "express";
import orderRouter from "./api/orders";
import productRouter from "./api/products";
import userRouter from "./api/users";
import dashboardRoutes from "./api/dashboard";

const router: express.Router = express();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/dashboard", dashboardRoutes);

export default router;

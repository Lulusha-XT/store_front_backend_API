import express, { Router } from "express";
import user_router from "../../handlers/users";

const userRouter: express.Router = express();
user_router(userRouter);

export default userRouter;

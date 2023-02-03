import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/users";
import { verifyToken } from "../utils/verifyToken";

const userStore = new UserStore();

const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUser = await userStore.index();
    res.json(allUser);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await userStore.create(user);
    let token_secret: any = process.env.TOKEN_SECRET;
    const token = jwt.sign({ user: newUser }, token_secret);
    res.json(token);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userStore.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

const user_router = (router: Router) => {
  router.get("/", verifyToken, getAllUser);
  router.get("/:id", verifyToken, getUser);
  router.post("/", createNewUser);
};

export default user_router;

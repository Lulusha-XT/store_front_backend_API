import express, { Router } from "express";
import dashboard_routes from "../../handlers/dashboard";

const dashBoardRouter: express.Router = express();
dashboard_routes(dashBoardRouter);

export default dashBoardRouter;

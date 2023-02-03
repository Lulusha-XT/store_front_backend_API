import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import logger from "./utils/logger";

const app: express.Application = express();
const address = "127.0.0.1:3000";
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", logger, router);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import delay from "./middleware/delay.js";
import commentRouter from "./route/commentRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", delay);
app.use("/", requestLogger);

app.post("/event", (req, res) => {
  console.log("event received");
  console.log(req.body);
  res.sendStatus(200);
});

app.use("/comments", commentRouter);

export default app;

import express from "express";
import cors from "cors";
import eventRoute from "./route/event.js";
import queryRoute from "./route/query.js";
import requestLogger from "./middleware/requestLogger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", requestLogger);

app.use("/event", eventRoute);
app.use("/query", queryRoute);

app.get("/healthcheck", (req, res) => res.sendStatus(200));


export default app;
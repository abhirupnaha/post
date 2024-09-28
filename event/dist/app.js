import express from "express";
import eventRoute from "./route/eventRoute.js";
import requestLogger from "./middleware/requestLogger.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", requestLogger);
app.get("/healthcheck", (req, res) => res.sendStatus(200));
app.use("/event", eventRoute);
export default app;
//# sourceMappingURL=app.js.map
// for this use case not using typescript.

import express from "express";
import cors from "cors";
import axios from "axios";

import requestLogger from "./requestLogger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", requestLogger);

app.post("/", async (req, res) => {
  const event = req.body;

  try {
    const responseArr = await Promise.allSettled([
      axios.post("http://localhost:3000/event", event), // for post service
      axios.post("http://localhost:3001/event", event), // for comment service
      axios.post("http://localhost:3003/event", event), // for query service
      // axios.post("http://localhost:3004/event", event) // for moderation service
    ]);

    responseArr.forEach((response) => {
      console.log(response.status);
    });

    res.sendStatus(200);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("failed request");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("no response");
        console.log(error.resquest);
      } else {
        console.log("unknown axios error", error.message);
      }
      // console.log(error.config);
    } else {
      console.log("something went wrong");
      console.log(error.message);
    }
  }
});

app.get("/healthcheck", (req, res) => res.sendStatus(200));

app.listen(3005, () => console.log("event server running at localhost:3005"));

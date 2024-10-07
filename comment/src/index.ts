import mongoose from "mongoose";
import app from "./app.js";

const port = 3002;
const MONGO_URL = "mongo-clusterip-srv:27017"

async function start() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/micro");
    await mongoose.connect(`mongodb://${MONGO_URL}/micro`);

    mongoose.connection.on("connected", () =>
      console.log("connected to mongodb"),
    );
    mongoose.connection.on("disconnected", () =>
      console.log("mongodb disconnected"),
    );
    mongoose.connection.on("error", (err) => {
      console.log("mongodb connection error");
      console.log(err);
    });
  } catch (error) {
    console.log("failed to connect to mongodb");
    console.log(error);
  }

  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}
start();

import mongoose from "mongoose";
import app from "./app.js";

const port = 3001;
const MONGO_URL = "mongo-clusterip-srv:27017"

async function start() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/micro");
    await mongoose.connect(`mongodb://${MONGO_URL}/micro`);

    mongoose.connection.on("connected", () => console.log("mongodb connected"));
    mongoose.connection.on("disconnected", () =>
      console.log("mongodb disconnected"),
    );
    mongoose.connection.on("error", (err) => {
      console.log("error occured on mongodb connection");
      console.log(err);
    });
  } catch (err) {
    console.log("failed to connect to mongodb");
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Post server running at port ${port}`);
  });
}
start();

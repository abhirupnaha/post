import mongoose from "mongoose";
import app from "./app.js";

const port = 3005;
const MONGO_URL = "mongo-clusterip-srv:27017"

async function start() {
    try {
        // await mongoose.connect("mongodb://localhost:27017/event");
        await mongoose.connect(`mongodb://${MONGO_URL}/event`);

        mongoose.connection.on("connected", () => console.log("mongodb connected"));
        mongoose.connection.on("disconnected", () =>
            console.log("mongodb disconnected"),
        );

        app.listen(3005, () => console.log("event server running at localhost:3005"));

    } catch (error: unknown) {
        console.error("error occured connecting to mongodb server");
        console.log(error);
    }
}
start();
import mongoose from "mongoose";
import app from "./app.js";
import syncEvent from "./helper/syncEvent.js";

const port = 3003;
const MONGO_URL = "mongo-clusterip-srv:27017"

async function start() {
    try {
        // await mongoose.connect("mongodb://localhost:27017/micro");
        await mongoose.connect(`mongodb://${MONGO_URL}/micro`);

        mongoose.connection.on("connected", () => console.log("mongodb connected"));
        mongoose.connection.on(
            "disconnected",
            () => console.log("mongodb disconnected")
        );
    } catch (err: unknown) {
        console.log("error occured while connecting to mongodb");
        console.log(err);
    }

    await syncEvent();

    app.listen(port, () => console.log(`query server running at localhost:${port}`));
}
start();
import mongoose from "mongoose";
import app from "./app.js";

const port = 3005;

async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/event");

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
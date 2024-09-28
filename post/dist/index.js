import mongoose from "mongoose";
import app from "./app.js";
const port = 3001;
const host = "localhost";
async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/micro");
        mongoose.connection.on("connected", () => console.log("mongodb connected"));
        mongoose.connection.on("disconnected", () => console.log("mongodb disconnected"));
        mongoose.connection.on("error", (err) => {
            console.log("error occured on mongodb connection");
            console.log(err);
        });
    }
    catch (err) {
        console.log("failed to connect to mongodb");
        console.log(err);
    }
    app.listen(port, host, () => {
        console.log(`Post server running at ${host}:${port}`);
    });
}
start();
//# sourceMappingURL=index.js.map
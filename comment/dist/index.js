import mongoose from "mongoose";
import app from "./app.js";
const port = 3001;
const host = "localhost";
async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/micro");
        mongoose.connection.on("connected", () => console.log("connected to mongodb"));
        mongoose.connection.on("disconnected", () => console.log("mongodb disconnected"));
        mongoose.connection.on("error", (err) => {
            console.log("mongodb connection error");
            console.log(err);
        });
    }
    catch (error) {
        console.log("failed to connect to mongodb");
        console.log(error);
    }
    app.listen(port, host, () => {
        console.log(`server running at ${host}:${port}`);
    });
}
start();
//# sourceMappingURL=index.js.map
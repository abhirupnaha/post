import mongoose from "mongoose";
import app from "./app.js";
const port = 3003;
async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/micro");
        mongoose.connection.on("connected", () => console.log("mongodb connected"));
        mongoose.connection.on("disconnected", () => console.log("mongodb disconnected"));
    }
    catch (err) {
        console.log("error occured while connecting to mongodb");
        console.log(err);
    }
    app.listen(port, () => console.log(`query server running at localhost:${port}`));
}
start();
//# sourceMappingURL=index.js.map
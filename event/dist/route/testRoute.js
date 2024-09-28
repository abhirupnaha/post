import { Router } from "express";
import eventModel from "../model/event.model.js";
import addEvent from "../helper/addEvent.js";
const testRoute = Router();
testRoute.get("/", async (req, res) => {
    try {
        console.log("getting events");
        const events = await eventModel
            .find()
            .populate("data");
        const filteredEvents = events.map((event) => {
            return {
                type: event.type,
                data: event.data
            };
        });
        console.log(filteredEvents);
        res.status(200).json(filteredEvents);
    }
    catch (error) {
        console.error("error in test route");
        console.log(error);
        res.sendStatus(500);
    }
});
testRoute.post("/", async (req, res) => {
    try {
        const { type, data } = req.body;
        if (!type) {
            res.sendStatus(400);
            return;
        }
        if (type === "PostCreated" || type === "CommentCreated") {
            if (!data) {
                res.sendStatus(400);
                return;
            }
            await addEvent(type, data);
        }
        else {
            await addEvent(type);
        }
        res.sendStatus(201);
    }
    catch (error) {
        console.error("error in test route");
        console.log(error);
    }
});
export default testRoute;
//# sourceMappingURL=testRoute.js.map
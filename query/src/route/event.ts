import { Router } from "express";
import axios from "axios";
import chalk from "chalk";
import addEvent from "../helper/addEvent.js";

export const TYPE_EVENT = {
    POST: "PostCreated",
    COMMENT: "CommentCreated",
    QUERY: "QueryCreated"
} as const;

const eventRoute = Router();

eventRoute.post("/", async (req, res) => {
    console.log(chalk.blue("event received"));
    console.log(req.body);

    const { type, data } = req.body;

    if (!type || !Object.values(TYPE_EVENT).includes(type)) {
        console.error("request rejected due to invalid event type");
        res.sendStatus(400);
        return;
    }

    try {
        if (!(type === TYPE_EVENT.QUERY)) {
            if (!data) {
                console.error("request rejected due to invalid event data");
                res.sendStatus(400);
                return;
            }

            await addEvent(type, data);

            await axios.post("http://post-event-clusterip-srv:3005/event", {
                type: "QueryCreated"
            });

            res.sendStatus(201);
        } else {
            res.sendStatus(200);
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("failed request");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.error("no response");
                console.log(error.request);
            } else {
                console.error("unknown axios error", error.message);
            }
        } else {
            console.error("something went wrong");
            console.log(error);
        }
        res.sendStatus(500);
    }
});

export default eventRoute;
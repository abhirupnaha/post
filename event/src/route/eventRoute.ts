import axios from "axios";
import { Router } from "express";
import eventModel, { EventType, TYPE_EVENT } from "../model/event.model.js";
import addEvent from "../helper/addEvent.js";
import { HydratedDocument } from "mongoose";
import chalk from "chalk";

const eventRoute = Router();

eventRoute.post("/", async (req, res) => {
    const { type, data } = req.body;

    if (!type) {
        res.sendStatus(400);
        return;
    }

    console.log(req.body);

    try {
        let event: HydratedDocument<EventType> = null;

        if (type === TYPE_EVENT.POST || type === TYPE_EVENT.COMMENT) {
            event = await addEvent(type, data);
        } else if (type === TYPE_EVENT.QUERY) {
            event = await addEvent(type);
        } else {
            res.sendStatus(400);
            return;
        }

        if (event) {
            const responseArr = await Promise.allSettled([
                axios.post("http://post-post-clusterip-srv:3001/event", { type, data }), // for post service
                axios.post("http://post-comment-clusterip-srv:3002/event", { type, data }), // for comment service
                axios.post("http://post-query-clusterip-srv:3003/event", { type, data }), // for query service
            ]);

            responseArr.forEach((response) =>
                response.status === "fulfilled" ?
                    console.log(chalk.blue(response.status))
                    : console.log(chalk.red(response.status))
            );

            res.sendStatus(201);
        } else {
            res.sendStatus(500);
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
                console.log(error);
            } else {
                console.log("unknown axios error", error.message);
            }
            // console.log(error.config);
        } else {
            console.error("something went wrong");
            console.log(error);
        }
        res.sendStatus(500);
    }
});

eventRoute.get("/", async (req, res) => {
    try {
        const events: HydratedDocument<EventType>[] = await eventModel
            .find()
            .populate("data", { _id: 0, __v: 0 });

        const filteredEvents: Omit<EventType, "dataModel">[] = events.map(
            (event) => {
                return (
                    event.type === TYPE_EVENT.QUERY ?
                        { type: event.type }
                        :
                        {
                            type: event.type,
                            data: event.data
                        }
                );
            });

        console.log("fetched events");
        console.log(filteredEvents);

        res.status(200).json(filteredEvents);
    } catch (error: unknown) {
        console.error("error while fetching events");
        console.log(error);
        res.sendStatus(500);
    }
});

export default eventRoute;
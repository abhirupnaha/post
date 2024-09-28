import axios from "axios";
import postModel from "../model/post.model.js";
import { EventType, PostEventDataType } from "../types.js";

export default async function syncEvent() {
    try {
        const posts = await postModel.find();

        const response = await axios.get("http://localhost:3005/event");
        const allEvents = response.data as EventType[];

        
    } catch (error: unknown) {
        console.error("error occured while syncing events");
        console.log(error);
    }
}
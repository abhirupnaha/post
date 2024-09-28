import { HydratedDocument } from "mongoose";
import commentEventDataModel, { CommentEventDataType } from "../model/commentEventData.modle.js";
import eventModel, { EventType, EventTypeType } from "../model/event.model.js";
import postEventDataModel, { PostEventDataType } from "../model/postEventData.model.js";

export default async function addEvent(
    type: EventTypeType,
    data?: PostEventDataType | CommentEventDataType
) {
    try {
        let event: HydratedDocument<EventType>

        if (type === "PostCreated") {
            data = data as PostEventDataType;

            const postEvent = await postEventDataModel.create({
                postId: data.postId,
                title: data.title
            });
            console.log("post event created");
            console.log(postEvent);

            event = await eventModel.create({
                type,
                dataModel: postEventDataModel.modelName,
                data: postEvent._id
            });
        } else if (type === "CommentCreated") {
            data = data as CommentEventDataType;

            const commentEvent = await commentEventDataModel.create({
                commentId: data.commentId,
                postId: data.postId,
                content: data.content
            });
            console.log("comment event created");
            console.log(commentEvent);

            event = await eventModel.create({
                type,
                dataModel: commentEventDataModel.modelName,
                data: commentEvent._id
            });
        } else if (type === "QueryCreated") {
            event = await eventModel.create({ type });
        } else {
            console.log("invalid event type")
            throw new Error("invalid event type");
        }

        console.log("event created");
        console.log(event);

        return event;
    } catch (error) {
        throw error;
    }
}
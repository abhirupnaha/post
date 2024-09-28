import commentEventDataModel from "../model/commentEventData.modle.js";
import eventModel from "../model/event.model.js";
import postEventDataModel from "../model/postEventData.model.js";
export default async function addEvent(type, data) {
    try {
        let event;
        if (type === "PostCreated") {
            data = data;
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
        }
        else if (type === "CommentCreated") {
            data = data;
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
        }
        else if (type === "QueryCreated") {
            event = await eventModel.create({ type });
        }
        else {
            console.log("invalid event type");
            throw new Error("invalid event type");
        }
        console.log("event created");
        console.log(event);
        return event;
    }
    catch (error) {
        throw new Error("error occured creating event");
    }
}
//# sourceMappingURL=addEvent.js.map
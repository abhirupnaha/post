import { model, Model, Schema, Types } from "mongoose";

export type EventTypeType = "PostCreated" | "CommentCreated" | "QueryCreated";

export const TYPE_EVENT = {
    POST: "PostCreated",
    COMMENT: "CommentCreated",
    QUERY: "QueryCreated"
} as const;

export type EventType = {
    type: EventTypeType,
    dataModel?: string,
    data?: Types.ObjectId
};

type EventModelType = Model<EventType>;

const eventSchema = new Schema<EventType, EventModelType>({
    type: {
        type: String,
        enum: ["PostCreated", "CommentCreated", "QueryCreated"],
        required: true
    },
    dataModel: {
        type: String,
        enum: ["CommentData", "PostData"]
    },
    data: {
        type: Schema.Types.ObjectId,
        refPath: "dataModel"
    }
});

const eventModel = model<EventType, EventModelType>("Event", eventSchema);

export default eventModel;
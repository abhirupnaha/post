import { model, Schema } from "mongoose";
export const TYPE_EVENT = {
    POST: "PostCreated",
    COMMENT: "CommentCreated",
    QUERY: "QueryCreated"
};
const eventSchema = new Schema({
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
const eventModel = model("Event", eventSchema);
export default eventModel;
//# sourceMappingURL=event.model.js.map
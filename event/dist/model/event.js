import { model, Schema } from "mongoose";
const eventSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    data: {
        type: new Schema({
            id: { type: String },
            title: { type: String },
            postId: { type: String },
            content: { type: String }
        }),
        required: true
    }
});
const eventModel = model("events", eventSchema);
export default eventModel;
//# sourceMappingURL=event.js.map
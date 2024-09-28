import { model, Schema } from "mongoose";
const postEventDataSchema = new Schema({
    postId: { type: String, required: true },
    title: { type: String, required: true }
});
const postEventDataModel = model("PostData", postEventDataSchema);
export default postEventDataModel;
//# sourceMappingURL=postEventData.model.js.map
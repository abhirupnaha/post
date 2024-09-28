import { model, Schema } from "mongoose";
const commentEventDataSchema = new Schema({
    commentId: { type: String, required: true },
    postId: { type: String, required: true },
    content: { type: String, required: true }
});
const commentEventDataModel = model("CommentData", commentEventDataSchema);
export default commentEventDataModel;
//# sourceMappingURL=commentEventData.modle.js.map
import { model, Schema } from "mongoose";
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});
const postModel = model("Post", postSchema);
export default postModel;
//# sourceMappingURL=post.js.map
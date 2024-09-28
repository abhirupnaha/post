import { model, Schema, SchemaTypes, } from "mongoose";
const postSchema = new Schema({
    postId: { type: SchemaTypes.ObjectId, required: true, unique: true },
    title: { type: String, required: true },
    comments: {
        type: [
            new Schema({
                // comment service gaurantees uniqueness of commentId
                commentId: { type: SchemaTypes.ObjectId, required: true },
                content: { type: String, required: true }
            })
        ],
        required: true
    },
});
const postModel = model("Queries", postSchema);
export default postModel;
//# sourceMappingURL=post.js.map
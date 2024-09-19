import { model, Schema, SchemaTypes, } from "mongoose";
const postSchema = new Schema({
    postId: { type: SchemaTypes.ObjectId, required: true, unique: true },
    title: { type: String, required: true },
    comments: {
        type: [
            new Schema({
                commentId: { type: SchemaTypes.ObjectId, required: true, unique: true },
                content: { type: String, required: true }
            })
        ],
        required: true
    },
});
const postModel = model("Queries", postSchema);
export default postModel;
//# sourceMappingURL=post.js.map
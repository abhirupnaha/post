import mongoose, { Schema, model } from "mongoose";
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
});
const commentCollectionSchema = new Schema({
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        unique: true,
    },
    commentCollection: {
        type: [commentSchema],
    },
});
commentCollectionSchema.index({ postId: 1 });
const commentsModel = model("comments", commentCollectionSchema);
export default commentsModel;
//# sourceMappingURL=comment.js.map
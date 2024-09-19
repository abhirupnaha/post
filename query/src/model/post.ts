import { model, Model, Schema, SchemaTypes, } from "mongoose"
import { CommentType, PostType } from "../types.js";

export type PostModelType = Model<PostType>;

const postSchema = new Schema<PostType, PostModelType>({
    postId: { type: SchemaTypes.ObjectId, required: true, unique: true },
    title: { type: String, required: true },
    comments: {
        type: [
            new Schema<CommentType>({
                commentId: { type: SchemaTypes.ObjectId, required: true, unique: true },
                content: { type: String, required: true }
            })
        ],
        required: true
    },
});

const postModel = model<PostType, PostModelType>("Queries", postSchema);

export default postModel;
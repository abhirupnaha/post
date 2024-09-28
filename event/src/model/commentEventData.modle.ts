import { model, Schema } from "mongoose"

export type CommentEventDataType = {
    postId: string,
    content: string,
    commentId: string
};

const commentEventDataSchema = new Schema<CommentEventDataType>({
    commentId: { type: String, required: true },
    postId: { type: String, required: true },
    content: { type: String, required: true }
});

const commentEventDataModel = model<CommentEventDataType>(
    "CommentData",
    commentEventDataSchema
);

export default commentEventDataModel;
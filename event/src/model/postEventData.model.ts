import { model, Schema } from "mongoose";

export type PostEventDataType = {
    postId: string,
    title: string
};

const postEventDataSchema = new Schema<PostEventDataType>({
    postId: { type: String, required: true },
    title: {type: String, required: true}
});

const postEventDataModel = model<PostEventDataType>(
    "PostData",
    postEventDataSchema
);

export default postEventDataModel;
import { Document, model, Schema } from "mongoose";

export interface PostType extends Document {
  title: string;
  createdAt: Date;
}

const postSchema = new Schema<PostType>({
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

const postModel = model<PostType>("Post", postSchema);

export default postModel;

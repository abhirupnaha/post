import { Types } from "mongoose";

export type CommentType = {
    commentId: Types.ObjectId,
    content: string
};

export type PostType = {
    postId: Types.ObjectId,
    title: string,
    comments: CommentType[]
};

export type CommentEventDataType = {
    postId: Types.ObjectId,
    id: Types.ObjectId,
    content: string,
}

export type PostEventDataType = {
    id: Types.ObjectId,
    title: string
};

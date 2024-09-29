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
    commentId: Types.ObjectId,
    content: string,
}

export type PostEventDataType = {
    postId: Types.ObjectId,
    title: string
};

export type EventTypeType = "PostCreated" | "CommentCreated" | "QueryCreated";

export type EventType = {
    type: EventTypeType,
    data?: PostEventDataType | CommentEventDataType
}
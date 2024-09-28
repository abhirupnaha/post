import chalk from "chalk";
import postModel from "../model/post.model.js";
import { CommentEventDataType, EventTypeType, PostEventDataType } from "../types.js";
import { TYPE_EVENT } from "../route/event.js";

export default async function addEvent(
    type: EventTypeType,
    data: PostEventDataType | CommentEventDataType
) {
    try {
        if (type === TYPE_EVENT.POST) {
            data = data as PostEventDataType;

            const newPost = await postModel.create({
                postId: data.id,
                title: data.title,
                comments: []
            });

            console.log(chalk.green("new post created"));
            console.log(newPost);
        }
        if (type === TYPE_EVENT.COMMENT) {
            data = data as CommentEventDataType;

            const existingPost = await postModel.findOne({
                postId: data.postId
            });

            if (!existingPost)
                throw new Error(`trying to add comment to post that does not exists`);

            existingPost.comments.push({
                commentId: data.commentId,
                content: data.content
            });
            const updatedPost = await existingPost.save();

            console.log(chalk.green(
                "new comment added to post id "
                + existingPost.postId
            ));
            console.log(updatedPost.comments[updatedPost.comments.length - 1]);
        }
    } catch (error: unknown) {
        console.error("error occured while adding post/comment");
        console.log(error);
    }
}
import axios from "axios";
import postModel from "../model/post.model.js";
import { CommentEventDataType, EventType, PostEventDataType } from "../types.js";
import { TYPE_EVENT } from "../route/event.js";
import chalk from "chalk";

export default async function syncEvent() {
    try {
        const posts = await postModel.find();

        const response = await axios.get("http://localhost:3005/event");
        const allEvents = response.data as EventType[];

        if (allEvents.length === 0) return;

        for (const event of allEvents) {
            if (event.type === TYPE_EVENT.POST) {
                const data = event.data as PostEventDataType;
                if (!(await postModel.findOne({ postId: data.postId }))) {
                    const newPost = await postModel.create({
                        postId: data.postId,
                        title: data.title,
                        comments: []
                    });
                    console.log(chalk.green("new post created"));
                    console.log(chalk.green(newPost));
                }
            }
            if (event.type === TYPE_EVENT.COMMENT) {
                const data = event.data as CommentEventDataType;
                const post = await postModel.findOne({ postId: data.postId });
                const commentExits = post.comments.find((comment) =>
                    comment.commentId.toString() === data.commentId.toString()
                );
                if (!commentExits) {
                    post.comments.push({
                        commentId: data.commentId,
                        content: data.content
                    });
                    const newComment = await post.save();
                    console.log(chalk.green("new comment created"));
                    console.log(chalk.green(
                        newComment.comments[newComment.comments.length - 1]
                    ));
                }
            }
        }
        console.log(chalk.blue("database synced to events"));
    } catch (error: unknown) {
        console.error("error occured while syncing events");
        console.log(error);
    }
}
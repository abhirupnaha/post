import chalk from "chalk";
import postModel from "../model/post.js";
import { TYPE_EVENT } from "../route/event.js";
export default async function addEvent(type, data) {
    try {
        if (type === TYPE_EVENT.POST) {
            data = data;
            const newPost = await postModel.create({
                postId: data.id,
                title: data.title,
                comments: []
            });
            console.log(chalk.green("new post created"));
            console.log(newPost);
        }
        if (type === TYPE_EVENT.COMMENT) {
            data = data;
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
            console.log(chalk.green("new comment added to post id "
                + existingPost.postId));
            console.log(updatedPost.comments[updatedPost.comments.length - 1]);
        }
    }
    catch (error) {
        console.error("error occured while adding post/comment");
        console.log(error);
    }
}
//# sourceMappingURL=addEvent.js.map
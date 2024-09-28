import { Router } from "express";
import postModel, { PostModelType } from "../model/post.model.js";

const queryRoute = Router();

queryRoute.get("/", async (req, res) => {
    try {
        const posts = await postModel.find({});
        const result = posts.map((post) => {
            return {
                id: post.postId,
                title: post.title,
                comments: post.comments.map((comment) => {
                    return {
                        id: comment.commentId,
                        content: comment.content
                    }
                })
            }
        });

        res.status(200).json(result);
    } catch (error: unknown) {
        console.error("mongodb error while fetching");
        res.sendStatus(500);
    }
});

export default queryRoute;
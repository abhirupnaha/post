import { Router } from "express";
import postModel from "../model/post.js";
import { CommentEventDataType, PostEventDataType } from "../types.js";
import axios from "axios";

const validRequests = {
    POST: "PostCreated",
    COMMENT: "commentCreated"
};

const eventRoute = Router();

eventRoute.post("/", async (req, res) => {
    const { type, data } = req.body;
    if (!type || !data || !Object.values(validRequests).includes(type)) {
        res.sendStatus(400);
        return;
    }
    try {
        if (type === validRequests.POST) {
            const postData = data as PostEventDataType;

            const newPost = await new postModel({
                postId: postData.id,
                title: postData.title,
                comments: []
            }).save();

            console.log("new post created");
            console.log({
                id: newPost.id,
                title: newPost.title,
                comments: []
            });
        } else {
            const commentData = data as CommentEventDataType;

            const existingPost = await postModel.findOne({ postId: commentData.postId });

            if (!existingPost) {
                res.sendStatus(404);
                return;
            }

            existingPost.comments.push({
                commentId: commentData.id,
                content: commentData.content
            });
            const response = await existingPost.save();

            console.log("new comment added to post id " + existingPost.id);
            console.log({
                id: existingPost.id,
                content: existingPost.comments[existingPost.comments.length - 1],
            });
        }

        await axios.post("http://localhost:3005/", {
            type: "QueryCreated",
            data: null
        });

        res.sendStatus(201);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log("failed request");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("no response");
                console.log(error.request);
            } else {
                console.log("unknown axios error", error.message);
            }
        }
        console.log("something went wrong");
        console.log(error);
        res.sendStatus(500);
    }
});

export default eventRoute;
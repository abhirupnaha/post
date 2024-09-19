import { Router } from "express";
import requestLogger from "../middleware/requestLogger.js";
import postModel from "../model/post.js";
const postRoute = Router();
postRoute.get("/healthcheck", requestLogger, (req, res) => {
    res.sendStatus(200);
});
postRoute.get("/", requestLogger, async (req, res) => {
    try {
        const posts = await postModel.find();
        console.log(posts);
        res.sendStatus(200);
    }
    catch (error) {
        console.log("error occured while fetching all posts");
        console.log(error);
        res.sendStatus(500);
    }
});
postRoute.post("/", requestLogger, async (req, res) => {
    try {
        const { post } = req.body;
        if (!post) {
            res.sendStatus(404);
            return;
        }
        const newPost = new postModel({ post: post });
        const createdPost = await newPost.save();
        console.log(createdPost);
        res.sendStatus(200);
    }
    catch (error) {
        console.log("error occured while inserting post");
        console.log(error);
        res.sendStatus(500);
    }
});
//# sourceMappingURL=post.js.map
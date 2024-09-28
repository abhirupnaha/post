import { Router } from "express";
import postModel from "../model/post.js";
import axios from "axios";
const postRoute = Router();
postRoute.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
});
postRoute.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        const formatedPosts = posts.map((post) => {
            return {
                id: post._id,
                title: post.title,
            };
        });
        res.status(201).json(formatedPosts);
    }
    catch (error) {
        console.log("error occured while fetching all posts");
        console.log(error);
        res.sendStatus(500);
    }
});
postRoute.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            res.sendStatus(404);
            return;
        }
        const newPost = new postModel({ title: title });
        const createdPost = await newPost.save();
        await axios.post("http://localhost:3005/event", {
            type: "PostCreated",
            data: {
                id: createdPost._id.toString(),
                title: createdPost.title,
            },
        });
        res.status(201).json({ id: createdPost.id.toString() });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log("failed axios request");
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log("no response");
                console.log(error.request);
            }
            else {
                console.log("something went wrong with axios request");
                console.log(error.message);
            }
            console.log("failed POST request to event service");
            res.sendStatus(201);
        }
        else {
            console.log("error occured while inserting post");
            console.log(error);
            res.sendStatus(500);
        }
    }
});
export default postRoute;
//# sourceMappingURL=postRoute.js.map
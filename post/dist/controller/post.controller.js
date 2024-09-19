import postModel from "../model/post.js";
export async function getAllPost(req, res) {
    try {
        const posts = await postModel.find();
        console.log(posts);
    }
    catch (err) {
        console.log("error occured while fetching posts");
    }
    res.sendStatus(200);
}
//# sourceMappingURL=post.controller.js.map
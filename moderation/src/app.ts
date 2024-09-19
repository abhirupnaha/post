import axios from "axios";
import express from "express";

const VALID_EVENT = {
    created: "CommentCreated",
    moderated: "CommentModerated"
}

const port = 3004;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => res.sendStatus(200));

app.post("/event", async (req, res) => {
    const { type, body } = req.body;
    if (!type || !body || type !== VALID_EVENT.created) {
        res.sendStatus(422);
        return;
    }

    const comment = body.content as string;
    const status: boolean = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (comment[0].toLowerCase() === 'o')
                resolve(true);
            else
                resolve(false);
        }, 500);
    });

    try {
        await axios.post("http://localhost:3005", {
            ...body,
            status: status ? "approved" : "rejected"
        });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("failed axios request");
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.error("no response");
                console.log(error.request);
            } else {
                console.error("something went wrong with axios request");
                console.log(error.message);
            }
        } else {
            console.error("unknown error occured");
            console.log(error)
        }
    }
});

app.listen(port, () => console.log("moderation server running on localhost:3005"));
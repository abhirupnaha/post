import { Router } from "express";
import commentsModel from "../model/comment.js";
import axios from "axios";

export type EventType = {
  type: "CommentCreated";
  data: {
    commentId: string;
    content: string;
    postId: string;
  };
};

const commentRouter = Router();

commentRouter.get("/healthCheck", (req, res) => {
  res.sendStatus(200);
});

commentRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(404).json({ message: "missing postId" });
    return;
  }
  try {
    const comments = await commentsModel.find({ postId: postId });

    const commentCollection =
      comments.length > 0
        ? comments[0].commentCollection.map((comment) => {
            return {
              id: comment.id,
              content: comment.content,
            };
          })
        : [];

    res.status(200).json(commentCollection);
  } catch (err) {
    console.log(`error while fetching comments of _id: ${postId}`);
    console.log(err.message);
    res.sendStatus(500);
  }
});

// POST /comments
// expected body = {
//   postId: string,
//   content: string
// }
commentRouter.post("/", async (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content)
    res.status(400).json({ message: "missing either content or postId" });

  try {
    const existingComment = await commentsModel.find({ postId });
    let event: EventType;

    if (existingComment.length === 0) {
      // creating new comment
      const newComment = new commentsModel({
        postId: postId,
        commentCollection: [{ content }],
      });

      const createdComment = await newComment.save();
      event = {
        type: "CommentCreated",
        data: {
          postId: createdComment.postId.toString(),
          content: content,
          commentId: createdComment.commentCollection[0].id.toString(),
        },
      };

      console.log("new comment created");
      console.log(event.data);
    } else {
      // add new comment to existing comment
      const currentComment = existingComment[0];
      currentComment.commentCollection.push({ content });

      const updatedComment = await currentComment.save();
      event = {
        type: "CommentCreated",
        data: {
          postId: updatedComment.postId.toString(),
          content: content,
          commentId: updatedComment.commentCollection[
            updatedComment.commentCollection.length - 1
          ].id.toString(),
        },
      };

      console.log("updated comment");

      console.log("commentCollection updated");
      console.log(event.data);
    }

    await axios.post("http://localhost:3005/event", event);

    res.status(201).json({ id: event.data.commentId });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("failed axios request");
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("no response");
        console.log(error.request);
      } else {
        console.log("something went wrong with axios request");
        console.log(error.message);
      }

      console.log("failed POST request to event service");
      res.sendStatus(201);
    } else {
      console.log("error occured while inserting comment");
      console.log(error);

      res.sendStatus(500);
    }
  }
});

export default commentRouter;

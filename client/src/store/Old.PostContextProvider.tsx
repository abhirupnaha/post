import { useState, useEffect } from "react";
import axios from "axios";

import PostType from "../types/post";
import CommentType from "../types/comment";

import postContext from "./postContext";

export default function PostContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const { signal } = new AbortController();

        setIsLoading(true);

        const postResponse = await axios.get("http://localhost:3000/post/", {
          signal,
        });
        const postData = postResponse.data as Omit<PostType, "comments">[];
        // console.log(postData);

        const commentResponseArr = await Promise.allSettled(
          postData.map(async (post) => {
            const response = await axios.get(
              `http://localhost:3001/comments/${post.id}`,
              {
                signal,
              },
            );
            return {
              postId: post.id,
              ...response,
            };
          }),
        );
        // console.log(commentResponseArr);

        const tempPost: PostType[] = [];
        postData.forEach((post) => {
          let comments: CommentType[] = [];
          for (const c of commentResponseArr) {
            if (c.status === "fulfilled") {
              if (c.value.postId === post.id) {
                comments = c.value.data;
              }
            }
          }
          tempPost.push({
            id: post.id,
            title: post.title,
            comments: comments,
          });
        });
        console.log(tempPost);

        setPosts(tempPost);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          console.log("request canceled");
          return;
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addPost = async (title: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/post", {
        title,
      });
      if (response.status !== 201)
        throw new Error(
          `post request failed with http status ${response.status}`,
        );

      const responseData = response.data as Omit<
        PostType,
        "comments" | "title"
      >;
      if (!responseData.id) throw new Error("new post id not given by server");

      const newPost: PostType = {
        id: responseData.id,
        title: title,
        comments: [],
      };
      setPosts((prevState) => [...prevState, newPost]);
    } catch (err: unknown) {
      console.log("error occured while adding new post");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string, postId: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:3001/comments", {
        content,
        postId,
      });

      if (response.status !== 201)
        throw new Error(
          `post request failed with http status ${response.status}`,
        );

      const responseData = response.data as Omit<CommentType, "content">;

      if (!responseData.id)
        throw new Error("new comment id not given by server");

      const newComment: CommentType = {
        content: content,
        id: responseData.id,
      };

      setPosts((prevPosts) => {
        for (const p of prevPosts) {
          if (p.id === postId) {
            p.comments.push(newComment);
            break;
          }
        }
        return [...prevPosts];
      });
    } catch (err) {
      console.log("error occured while adding new comment");
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.log(err.response);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        addPost,
        addComment,
        isLoading,
      }}
    >
      {" "}
      {children}{" "}
    </postContext.Provider>
  );
}

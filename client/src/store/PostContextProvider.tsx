import axios from "axios";
import { useEffect, useState } from "react"
import PostType from "../types/post"
import CommentType from "../types/comment";
import postContext from "./postContext";

export default function ContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const { signal } = new AbortController();

                setIsLoading(true);

                const queryResponse = await axios.get(
                    "http://localhost:3003/query",
                    { signal }
                );
                const query = queryResponse.data as PostType[];

                console.log(query);

                setPosts(query);
            } catch (error: unknown) {
                if (axios.isCancel(error)) {
                    console.log("request to query service canceled");
                    return;
                } else if (axios.isAxiosError(error)) {
                    console.error("request to query service failed");

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
                } else {
                    console.error("unknow error occured");
                    console.log(error);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    async function addPost(title: string) {
        try {
            setIsLoading(true);

            const response = await axios.post("http://localhost:3001/post", {
                title
            });

            if (response.status !== 201)
                throw new Error(
                    `post request to post service failed with http status 
                    ${response.status}`
                );

            const responseData = response.data as Pick<PostType, "id">
            const newPost: PostType = {
                id: responseData.id,
                title,
                comments: []
            };

            setPosts((prevState) => [...prevState, newPost]);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("request to post service failed");

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
            } else {
                console.error("unknow error occured");
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function addComment(content: string, postId: string) {
        try {
            setIsLoading(true);

            const response = await axios.post("http://localhost:3002/comments", {
                content,
                postId,
            });

            if (response.status !== 201)
                throw new Error(
                    `post request to comment service failed with http status
                    ${response.status}`
                );

            const responseData = response.data as Omit<CommentType, "content">;
            const newComment: CommentType = {
                id: responseData.id,
                content
            };

            setPosts((prevPosts) => {
                const po = prevPosts;
                for (const p of po) {
                    if (p.id === postId) {
                        console.log("previous comments");
                        console.log(p.comments);
                        p.comments.push(newComment);
                        break;
                    }
                }
                return [...po];
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("request to comment service failed");

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
            } else {
                console.error("unknow error occured");
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <postContext.Provider
            value={{
                posts,
                addPost,
                addComment,
                isLoading
            }}
        >
            {children}
        </postContext.Provider>
    );
}
import { createContext } from "react";

import PostType from "../types/post";

export type PostContextType = {
  posts: PostType[];
  addPost: (title: string) => void;
  addComment: (content: string, postId: string) => void;
  isLoading: boolean;
};

const postContext = createContext<PostContextType>({
  posts: [],
  addComment: () => {},
  addPost: () => {},
  isLoading: false,
});

export default postContext;

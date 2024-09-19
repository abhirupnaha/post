import CommentType from "./comment";

type PostType = {
  id: string;
  title: string;
  comments: CommentType[];
};

export default PostType;

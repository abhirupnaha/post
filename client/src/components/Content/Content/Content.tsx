import PostType from "../../../types/post";
import AddComment from "../../Comment/AddComment/AddComment";
import Card, { CardLevelType } from "../../ui/Card/Card";

import cssClasses from "./Content.module.css";

export default function Content({
  post,
  level,
}: {
  post: PostType;
  level: CardLevelType;
}) {
  return (
    <Card type="article" level={level} className={cssClasses["content"]}>
      <section className={cssClasses["content__post"]}>
        <p className={cssClasses["content__post__title"]}> {post.title} </p>
      </section>
      <section className={cssClasses["content__comments"]}>
        <div className={cssClasses["content__comments__action"]}>
          <h3>Comments</h3>
          <AddComment post={{ title: post.title, id: post.id }} />
        </div>
        {post.comments.length > 0 ? (
          <ul className={cssClasses["content__comments__ul"]}>
            {post.comments.map((comment) => (
              <li
                key={comment.id}
                className={cssClasses["content__comments__li"]}
              >
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p> no comments </p>
        )}
      </section>
    </Card>
  );
}

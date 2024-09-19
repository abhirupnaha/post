import { useContext } from "react";
import postContext from "../../../store/postContext";
import Card from "../../ui/Card/Card";
import Content from "../Content/Content";

import cssClasses from "./ShowContent.module.css";

export default function ShowContent() {
  const ctx = useContext(postContext);

  const { posts, isLoading } = ctx;

  return (
    <Card level={1} type="section" className={cssClasses["container"]}>
      <h2> Posts </h2>
      {isLoading && <h4> loading ... </h4>}
      {!isLoading &&
        (posts.length > 0 ? (
          <ul className={cssClasses["container__ul"]}>
            {posts.map((post) => (
              <li key={post.id}>
                <Content post={post} level={2} />
              </li>
            ))}
          </ul>
        ) : (
          <p> no posts </p>
        ))}
    </Card>
  );
}

import { useContext, useState } from "react";

import cssClasses from "./NewPost.module.css";
import Card from "../../ui/Card/Card";
import AutoSizeTextArea from "../../ui/AutoSizeTextArea/AutoSizeTextarea";
import { MainButton } from "../../ui/Button/Button";
import postContext from "../../../store/postContext";

export default function NewPost() {
  const [inputState, setInputState] = useState<string | null>(null);
  const ctx = useContext(postContext);

  function submitHandler() {
    console.log(inputState);

    if (inputState) ctx.addPost(inputState);

    setInputState(null);
  }

  return (
    <Card level={1} type="section" className={cssClasses["newPost"]}>
      <div className={cssClasses["newPost__input"]}>
        <AutoSizeTextArea
          inputState={inputState}
          setInputState={setInputState}
          placeholder="New Post"
          className={cssClasses["textarea"]}
        />
      </div>
      <MainButton
        onClick={submitHandler}
        className={cssClasses["newPost__button"]}
      >
        Post
      </MainButton>
    </Card>
  );
}

import { useContext, useState } from "react";
import Modal from "../../ui/Modal/Modal";
import cssClasses from "./AddComment.module.css";
import { MainButton, SecondaryButton } from "../../ui/Button/Button";
import AutoSizeTextArea from "../../ui/AutoSizeTextArea/AutoSizeTextarea";
import PostType from "../../../types/post";
import postContext from "../../../store/postContext";

export default function AddComment({
  post,
}: {
  post: Pick<PostType, "title" | "id">;
}) {
  const [showComentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const ctx = useContext(postContext);

  const onSubmitCommentHandler = () => {
    console.log(comment);

    if (comment) ctx.addComment(comment, post.id);

    setComment(null);
    setShowCommentModal(false);
  };

  return (
    <>
      {showComentModal ? (
        <Modal onClick={() => setShowCommentModal(false)}>
          <section className={cssClasses["comment__post"]}>
            <p> {post.title} </p>
          </section>
          <section className={cssClasses["comment__container"]}>
            <div className={cssClasses["comment__container__input"]}>
              <AutoSizeTextArea
                inputState={comment}
                setInputState={setComment}
                placeholder="Your Comment ..."
                className={cssClasses["comment__input"]}
              />
            </div>
            <MainButton
              className={cssClasses["comment__container__add-bttn"]}
              onClick={onSubmitCommentHandler}
            >
              Comment
            </MainButton>
          </section>
        </Modal>
      ) : (
        <SecondaryButton
          className={cssClasses["comment__bttn"]}
          onClick={() => setShowCommentModal(true)}
        >
          add comment
        </SecondaryButton>
      )}
    </>
  );
}

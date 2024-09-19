import { createPortal } from "react-dom";

import Card from "../Card/Card";
import cssClasses from "./Modal.module.css";

function Backdrop({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return <div className={cssClasses["backdrop"]} onClick={onClick} />;
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <Card type="article" level={2} className={cssClasses["overlay"]}>
      {children}
    </Card>
  );
}

const body = document.querySelector("body");

export default function Modal({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <>
      {createPortal(<Backdrop onClick={onClick} />, body!)}
      {createPortal(<ModalOverlay> {children} </ModalOverlay>, body!)}
    </>
  );
}

import { useEffect, useRef } from "react";
import cssClasses from "./AutoSizeTextarea.module.css";

type AutoSizeTextareaProps = {
  className?: string;
  inputState: string | null;
  setInputState: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder: string;
};

export default function AutoSizeTextArea({
  setInputState,
  inputState,
  className,
  placeholder,
}: AutoSizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputState]);

  function changeTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputState(event.target.value);
  }

  return (
    <textarea
      ref={textareaRef}
      className={
        className
          ? `${cssClasses["textarea"]} ${className}`
          : cssClasses["textarea"]
      }
      placeholder={placeholder}
      value={inputState ? inputState : ""}
      onChange={changeTextarea}
      rows={1}
    ></textarea>
  );
}

import cssClasses from "./Card.module.css";

export type CardLevelType = 1 | 2 | 3;

type CardProps = {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  className?: string;
  type: Extract<
    keyof JSX.IntrinsicElements,
    "div" | "article" | "main" | "section" | "ul" | "li"
  >;
};

export default function Card({
  children,
  level,
  type: Type,
  className,
}: CardProps) {
  let styles = cssClasses["container"];
  switch (level) {
    case 1:
      styles = styles.concat(" ", cssClasses["container--level-1"]);
      break;
    case 2:
      styles = styles.concat(" ", cssClasses["container--level-2"]);
      break;
    case 3:
      styles = styles.concat(" ", cssClasses["container--level-3"]);
      break;
    case 4:
      styles = styles.concat(" ", cssClasses["container--level-4"]);
      break;
    default:
      console.log(level);
  }

  return (
    <Type className={className ? `${styles} ${className}` : styles}>
      {children}
    </Type>
  );
}

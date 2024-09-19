import cssClasses from "./Button.module.css";

export function MainButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const styles = className
    ? `${cssClasses["bttn"]} ${cssClasses["bttn--main"]} ${className}`
    : `${cssClasses["bttn"]} ${cssClasses["bttn--main"]}`;

  return (
    <button className={styles} {...props}>
      {children ? children : ""}
    </button>
  );
}

export function SecondaryButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const styles = className
    ? `${cssClasses["bttn"]} ${cssClasses["bttn--second"]} ${className}`
    : `${cssClasses["bttn"]} ${cssClasses["bttn--second"]}`;

  return (
    <button className={styles} {...props}>
      {children ? children : ""}
    </button>
  );
}

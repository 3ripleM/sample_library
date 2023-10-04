import classnames from "classnames";

export const Button = ({
  onClick,
  children,
  size = "md",
  classname,
}: {
  onClick: () => void;
  children: React.ReactNode;
  size?: "md" | "sm" | "lg";
  classname?: string;
}) => (
  <button
    className={classnames(
      "btn rounded-md px-2 transition-colors hover:bg-neutral-900",
      {
        "btn-md": size === "md",
        "btn-lg": size === "lg",
        "btn-sm": size === "sm",
      },
      classname,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

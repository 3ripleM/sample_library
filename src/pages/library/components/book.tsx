import { Button } from "@components/button";
import classnames from "classnames";
import { Lazy } from "fp-ts/lib/function";
import React from "react";

type BookProps = {
  name: string;
  price: number;
  description: string | null;
  category: string;
  onDelete: Lazy<void>;
  onClick: Lazy<void>;
};

export const Book = ({
  name,
  price,
  onDelete,
  category,
  description,
  onClick,
}: BookProps) => {
  const [showMore, setShowMore] = React.useState(false);
  const [showMoreButton, setShowMoreButton] = React.useState(false);

  const descRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fn = () => {
      if (descRef.current) {
        if (descRef.current.scrollHeight === descRef.current.clientHeight) {
          setShowMoreButton(false);
        } else {
          setShowMoreButton(true);
        }
      }
    };

    fn();

    window.addEventListener("resize", fn);

    return window.removeEventListener("resize", () => fn);
  }, []);

  const showMoreLessButton = React.useMemo(
    () => (showMoreButton && !showMore) || (!showMoreButton && showMore),
    [showMore, showMoreButton],
  );

  return (
    <button
      className="flex flex-col gap-2 w-full rounded-md px-4 pb-3 bg-neutral-700 text-left overflow-hidden hover:bg-zinc-700"
      onClick={onClick}
    >
      <div className="flex justify-between items-center pt-3 pb-2 border-b-2 border-neutral-600 w-full">
        <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:items-center">
          <h3 className="px-2 py-1 bg-neutral-600 capitalize text-sm">
            #{category}
          </h3>
          <h2 className="font-extrabold text-lg">{name}</h2>
          <h4>${price.toLocaleString("en")}</h4>
        </div>

        <Button
          classname="btn-ghost text-sm self-start underline underline-offset-2 hover:no-underline hover:!bg-red-700 hover:border-red-700"
          size="sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>

      {description && (
        <span
          ref={descRef}
          className={classnames("font-light text-base", {
            "line-clamp-4": !showMore,
          })}
        >
          {description}
        </span>
      )}

      {showMoreLessButton && (
        <button
          className="hover:text-blue-400 transition-colors cursor-pointer text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            setShowMore(!showMore);
            setShowMoreButton(!showMoreButton);
          }}
        >
          {showMore ? "See less" : "See More"}
        </button>
      )}
    </button>
  );
};

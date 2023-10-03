import React from "react";
import classnames from "classnames";
import "./App.css";
import { E, constVoid, pipe, t } from "@prelude";
import { bookCodec } from "@core/entities";
import { Modal, ModalProps } from "./components/modal";
import { Button } from "@components/button";
import { TextInput } from "@components/inputs/text-input";
import { useForm } from "react-hook-form";

const Book = ({
  name,
  price,
  onDelete,
  category,
  description,
}: {
  name: string;
  price: number;
  description: string | null;
  category: string;
  onDelete: () => void;
}) => {
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
    <div className="flex flex-col gap-2 w-full rounded-md px-4 pb-3 bg-neutral-700">
      <div className="flex justify-between items-center pt-3 pb-2 border-b-2 border-neutral-600">
        <div className="flex gap-2">
          <h2 className="font-extrabold">{name}</h2>
          {category}
          <h3>{price}</h3>
        </div>

        <Button
          classname="hover:bg-red-700 hover:border-red-700 btn-ghost text-sm"
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
        <span
          className="hover:text-blue-400 transition-colors cursor-pointer text-blue-500"
          onClick={() => {
            setShowMore(!showMore);
            setShowMoreButton(!showMoreButton);
          }}
        >
          {showMore ? "See less" : "See More"}
        </span>
      )}
    </div>
  );
};

const sample_data: Array<t.OutputOf<typeof bookCodec>> = [
  {
    id: 1,
    category: "fiction",
    name: "Court of Mist and Fury",
    description: `Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.
As her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.
Bestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.`,
    price: 12,
  },
  {
    id: 2,
    category: "fiction",
    name: "Looking for Alaska",
    description: `Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet). He heads off to the sometimes crazy and anything-but-boring world of Culver Creek Boarding School, and his life becomes the opposite of safe. Because down the hall is Alaska Young. The gorgeous, clever, funny, sexy, self-destructive, screwed up, and utterly fascinating Alaska Young. She is an event unto herself. She pulls Pudge into her world, launches him into the Great Perhaps, and steals his heart. Then. . . .
After. Nothing is ever the same`,
    price: 12,
  },
  {
    id: 3,
    category: "fiction",
    name: "Looking for Alaska",
    description: `Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet).`,
    price: 12,
  },
];

const formValidation: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Array<{ codec: t.Type<any, any, unknown>; error: string }>
> = {
  name: [
    { codec: t.NonEmptyString, error: "name should be a non empty string" },
  ],
  price: [
    { codec: t.NonEmptyString, error: "Price is required" },
    { codec: t.NumberFromString, error: "Price should be number" },
  ],
  category: [
    { codec: t.NonEmptyString, error: "category should be a non empty string" },
  ],
};

const AddModal = ({ openState }: { openState: ModalProps["modalState"] }) => {
  const { formState, register, handleSubmit } = useForm<{
    name: string;
    price: number;
    category: string;
  }>({});

  return (
    <Modal modalState={openState} title="Kooft">
      <form onSubmit={handleSubmit((v) => console.log(v))}>
        <TextInput
          label="Name"
          placeholder="Name of the book"
          {...register("name")}
        />
        <TextInput
          label="Category"
          placeholder="Book Category"
          {...register("category")}
        />

        <TextInput
          label="Price"
          placeholder="Enter the price"
          {...register("price")}
        />
        <Button onClick={constVoid}>Submit</Button>
      </form>
    </Modal>
  );
};

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="mx-auto min-w-[400px] max-w-[700px] flex flex-col justify-center gap-5">
      <div className="flex justify-between">
        <h1>Library</h1>
        <Button
          classname="w-20"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      {sample_data.map(({ category, description, name, price, id }) => (
        <Book
          key={id}
          category={category}
          description={description}
          name={name}
          price={price}
          onDelete={() => console.log("delete id: ", id)}
        />
      ))}
      <AddModal openState={[isAddModalOpen, setIsAddModalOpen]} />
    </div>
  );
}

export default App;

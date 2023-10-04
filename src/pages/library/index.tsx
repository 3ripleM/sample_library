import { A, NEA, O, R, Tagged, Untagged, constVoid, pipe } from "@prelude";
import { Book } from "./components/book";
import { Button } from "@components/button";
import { Modal, ModalProps } from "@components/modal/modal";
import { Form } from "@components/form";
import { TextInput } from "@components/inputs/text-input";
import { TextareaInput } from "@components/inputs/textarea";
import { DefaultValues } from "react-hook-form";
import { librarySlice } from "../../store/features/library";
import { BookCreate, BookEntity, BookId, Book as BookT } from "@core/entities";
import { Elm, ElmView, Update } from "@hooks/useElm";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
import { Lazy } from "fp-ts/lib/function";

const AddEditModal = ({
  openState,
  onSubmit,
  defaultValues,
}: {
  openState: ModalProps["modalState"];
  onSubmit: (values: BookCreate) => void;
  defaultValues?: DefaultValues<BookCreate>;
}) => {
  return (
    <Modal
      modalState={openState}
      title={defaultValues ? `Edit "${defaultValues.name}"` : "Add a Book"}
    >
      <Form<BookCreate>
        onSubmit={onSubmit}
        validationSchema={BookEntity.createCodec}
        defaultValues={defaultValues}
      >
        <TextInput label="Name" placeholder="Name of the book" name="name" />
        <TextInput
          name="category"
          label="Category"
          placeholder="Book Category"
        />

        <TextInput label="Price" placeholder="Enter the price" name="price" />

        <TextareaInput
          name="description"
          label="Description"
          placeholder="Book Description"
        />

        <Button onClick={constVoid}>Submit</Button>
      </Form>
    </Modal>
  );
};

namespace Message {
  export interface UserClickedAddButton
    extends Tagged<"UserClickedAddButton"> {}
  export const UserClickedAddButton: UserClickedAddButton = {
    _tag: "UserClickedAddButton",
  };

  export interface UserClickedCloseModal
    extends Tagged<"UserClickedCloseModal"> {}
  export const UserClickedCloseModal: UserClickedCloseModal = {
    _tag: "UserClickedCloseModal",
  };

  export interface UserSubmittedAddForm extends Tagged<"UserSubmittedAddForm"> {
    book: BookCreate;
  }
  export const UserSubmittedAddForm = (
    spec: Untagged<UserSubmittedAddForm>,
  ): UserSubmittedAddForm => ({ ...spec, _tag: "UserSubmittedAddForm" });

  export interface UserSubmittedEditForm
    extends Tagged<"UserSubmittedEditForm"> {
    book: BookT;
  }
  export const UserSubmittedEditForm = (
    spec: Untagged<UserSubmittedEditForm>,
  ): UserSubmittedEditForm => ({ ...spec, _tag: "UserSubmittedEditForm" });

  export interface UserClickedRemoveABook
    extends Tagged<"UserClickedRemoveABook"> {
    bookId: BookId;
  }
  export const UserClickedRemoveABook = (
    spec: Untagged<UserClickedRemoveABook>,
  ): UserClickedRemoveABook => ({ ...spec, _tag: "UserClickedRemoveABook" });

  export interface UserClickedEditABook extends Tagged<"UserClickedEditABook"> {
    bookId: BookId;
  }
  export const UserClickedEditABook = (
    spec: Untagged<UserClickedEditABook>,
  ): UserClickedEditABook => ({ ...spec, _tag: "UserClickedEditABook" });
}

type Message =
  | Message.UserClickedAddButton
  | Message.UserClickedCloseModal
  | Message.UserClickedRemoveABook
  | Message.UserClickedEditABook
  | Message.UserSubmittedEditForm
  | Message.UserSubmittedAddForm;

namespace ModalState {
  export interface Closed extends Tagged<"Closed"> {}
  export const Closed: Closed = { _tag: "Closed" };
  export interface Create extends Tagged<"Create"> {}
  export const Create: Create = { _tag: "Create" };

  export interface Edit extends Tagged<"Edit"> {
    book: BookT;
  }
  export const Edit = (spec: Untagged<Edit>): Edit => ({
    ...spec,
    _tag: "Edit",
  });
}

type ModalState = ModalState.Create | ModalState.Edit | ModalState.Closed;

type Model = {
  modalState: ModalState;
};

const initialModel: Model = {
  modalState: ModalState.Closed,
};

const update: Update<Model, Message> = (
  model,
  message,
  { reduxDispatch, reduxStore },
) => {
  return match(message)
    .with({ _tag: "UserClickedAddButton" }, () => ({
      model: { ...model, modalState: ModalState.Create },
    }))
    .with({ _tag: "UserClickedCloseModal" }, () => ({
      model: { ...model, modalState: ModalState.Closed },
    }))
    .with({ _tag: "UserSubmittedAddForm" }, ({ book }) => ({
      model: { ...model, modalState: ModalState.Closed },
      effect: () => () => reduxDispatch(librarySlice.actions.add(book)),
    }))
    .with({ _tag: "UserSubmittedEditForm" }, ({ book }) => ({
      model: { ...model, modalState: ModalState.Closed },
      effect: () => () => reduxDispatch(librarySlice.actions.edit(book)),
    }))
    .with({ _tag: "UserClickedRemoveABook" }, ({ bookId }) => ({
      model,
      effect: () => () => {
        reduxDispatch(librarySlice.actions.remove(bookId));
      },
    }))
    .with({ _tag: "UserClickedEditABook" }, ({ bookId }) =>
      pipe(
        reduxStore.library,
        R.lookup(bookId.toString()),
        O.foldW(
          () => ({
            model,
            effect: () => () => {
              toast.error("Book not found");
            },
          }),
          (book) => ({
            model: { ...model, modalState: ModalState.Edit({ book }) },
          }),
        ),
      ),
    )
    .exhaustive();
};

const EmptyLibrary = ({ onClick }: { onClick: Lazy<void> }) => (
  <div className="w-full bg-neutral-500 flex  items-center p-10 flex-col gap-10 rounded-lg">
    <h2 className="font-bold text-lg">Empty Library</h2>
    <Button onClick={onClick}>Click to Add a Book</Button>
  </div>
);

const view: ElmView<Model, Message> = (model, dispatch, { reduxStore }) => (
  <div className="mx-auto sm:min-w-[100px] md:min-w-[400px] max-w-[700px] flex flex-col justify-center gap-5">
    <div className="flex justify-between items-center">
      <h1>Library</h1>
      <Button
        classname="px-4 btn-md"
        onClick={() => {
          dispatch(Message.UserClickedAddButton);
        }}
      >
        Add a Book
      </Button>
    </div>

    {pipe(
      reduxStore.library,
      R.map(({ category, description, name, price, id }) => (
        <Book
          key={id}
          category={category}
          description={description}
          name={name}
          price={price}
          onClick={() => dispatch(Message.UserClickedEditABook({ bookId: id }))}
          onDelete={() =>
            dispatch(Message.UserClickedRemoveABook({ bookId: id }))
          }
        />
      )),
      R.toArray,
      NEA.fromArray,
      O.foldW(
        () => (
          <EmptyLibrary
            onClick={() => dispatch(Message.UserClickedAddButton)}
          />
        ),
        A.map(([, element]) => element),
      ),
    )}

    <AddEditModal
      openState={[
        model.modalState._tag !== "Closed",
        () => dispatch(Message.UserClickedCloseModal),
      ]}
      defaultValues={
        model.modalState._tag === "Edit" ? model.modalState.book : undefined
      }
      onSubmit={(value) => {
        match(model.modalState)
          .with({ _tag: "Create" }, () => {
            dispatch(Message.UserSubmittedAddForm({ book: value }));
          })
          .with({ _tag: "Edit" }, ({ book }) => {
            dispatch(
              Message.UserSubmittedEditForm({ book: { ...book, ...value } }),
            );
          })
          .with({ _tag: "Closed" }, () => {
            toast.error("Something went wrong");
          })
          .exhaustive();
      }}
    />
  </div>
);

export const Library = () => (
  <Elm initialModel={initialModel} update={update} view={view} />
);

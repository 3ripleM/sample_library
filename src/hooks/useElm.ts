/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { T, Tagged, IO } from "@prelude";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AppDispatch, RootState } from "../store/store";

export type Dispatch<Message extends Tagged<any>> = (
  message: Message,
) => IO.IO<void>;

type R<Model, Message extends Tagged<any>> = {
  model: Model;
  effect?: (dispatch: Dispatch<Message>) => T.Task<void> | IO.IO<void>;
};

export type Update<Model, Message extends Tagged<any>> = (
  model: Model,
  message: Message,
  reduxStore: { reduxStore: RootState; reduxDispatch: AppDispatch },
) => R<Model, Message>;

type Subscriber<Message extends Tagged<any>> = {
  mkMessage: (dispatch: (messsage: Message) => void) => void;
  dependencies: React.DependencyList;
};

export type ElmSubscribers<Message extends Tagged<any>> = Array<
  Subscriber<Message>
>;

export type ElmView<Model, Message extends Tagged<any>> = (
  model: Model,
  dispatch: (message: Message) => void,
  reduxStore: { reduxStore: RootState },
) => JSX.Element;

type ElmProps<Model, Message extends Tagged<any>> = {
  update: Update<Model, Message>;
  initialModel: Model;
  initialMessages?: Message[];
  view: ElmView<Model, Message>;
  subscribers?: Array<Subscriber<Message>>;
};

export const Elm = <Model, Message extends Tagged<any>>({
  initialModel,
  update,
  initialMessages,
  subscribers,
  view,
}: ElmProps<Model, Message>) => {
  const model_ = React.useRef(initialModel);
  const [model, setState] = React.useState(initialModel);

  const reduxDispatch = useAppDispatch();
  const reduxStore = useAppSelector((state) => state);

  const dispatch = React.useCallback(
    (message: Message) => {
      const result = update(model_.current, message, {
        reduxDispatch,
        reduxStore,
      });
      console.log("Dispatch: ", message, result);

      model_.current = result.model;

      setState(result.model);

      if (result.effect && typeof result.effect === "function") {
        result.effect((message) => () => dispatch(message))();
      }
    },
    [update, reduxDispatch, reduxStore],
  );

  subscribers?.forEach(({ dependencies, mkMessage }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
    React.useEffect(() => mkMessage(dispatch), dependencies);
  });

  React.useEffect(() => {
    if (initialMessages) {
      initialMessages.forEach((message) => dispatch(message));
    }
  }, [dispatch, initialMessages]);

  return view(model, dispatch, { reduxStore });
};

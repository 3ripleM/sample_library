import React from "react";
import { DefaultValues, useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <A extends Record<string, any>>({
  defaultValues,
  children,
  onSubmit,
}: {
  onSubmit: (value: A) => void;
  children: Array<JSX.Element>;
  defaultValues?: DefaultValues<A>;
}) => {
  const methods = useForm<A>({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register(child.props.name),
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

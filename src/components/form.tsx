import React from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { t } from "@prelude";
import { ioTsResolver } from "@hookform/resolvers/io-ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <A extends Record<string, any>>({
  defaultValues,
  children,
  onSubmit,
  validationSchema,
}: {
  onSubmit: (value: A) => void;
  children: Array<JSX.Element>;
  defaultValues?: DefaultValues<A>;
  validationSchema: t.Mixed;
}) => {
  const { handleSubmit, register, formState } = useForm<A>({
    defaultValues,
    resolver: ioTsResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register(child.props.name),
                error: formState.errors[child.props.name]?.message,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

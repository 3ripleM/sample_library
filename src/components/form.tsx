import { E, pipe, t } from "@prelude";
import React from "react";
import { Form } from "react-hook-form";

export type FormProps = {
  validation: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array<{ codec: t.Type<any, any, unknown>; error: string }>
  >;
  children: React.ReactNode;
};

// export const Form = (props: FormProps) => {
//   const [errors, setErrors] = React.useState<Record<string, string | null>>({});

//   return (
//     <form
//       onChange={(event) => {
//         const name = (event.target as HTMLInputElement).name;
//         const value = (event.target as HTMLInputElement).value;

//         if (Object.keys(props.validation).find((v) => v === name)) {
//           props.validation[name].every(({ codec, error }) =>
//             pipe(
//               codec.decode(value),
//               E.fold(
//                 () => {
//                   setErrors({ ...errors, [name]: error });
//                   return false;
//                 },
//                 () => {
//                   setErrors({ ...errors, [name]: null });
//                   return true;
//                 },
//               ),
//             ),
//           );
//         }
//       }}
//     ></form>
//   );
// };

const Form_ = () => {
  return <Form />;
};

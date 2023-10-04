import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";
import * as IO from "fp-ts/lib/IO";
import * as R from "fp-ts/lib/Record";
import * as A from "fp-ts/lib/Array";
import * as Eq from "fp-ts/Eq";
import * as T from "fp-ts/Task";

export * as t from "./io-ts";
export * from "./branded";

import { pipe, flow, constVoid, constNull } from "fp-ts/function";

export { pipe, flow, constVoid, constNull, E, O, IO, R, A, Eq, T };

export interface Tagged<a> {
  readonly _tag: a;
}

export namespace Tagged {
  export const mkEq = <a extends string>(a: Eq.Eq<a>): Eq.Eq<Tagged<a>> =>
    Eq.contramap((x: Tagged<a>) => x._tag)(a);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Untagged<a> = Omit<a, "_tag">;

export type TagOf<a> = a extends Tagged<infer tag> ? tag : never;

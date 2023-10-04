import { t } from "@prelude";

// -------------------------------------------------------------------------------------
// Book
// -------------------------------------------------------------------------------------
export namespace BookEntity {
  export const Id = t.fromRefinement(
    "BookId",
    (x): x is number => typeof x === "number" && x > 0,
  );

  export const createCodec = t.type({
    name: t.NonEmptyString,
    description: t.NonEmptyString,
    category: t.NonEmptyString,
    price: t.union([t.NumberFromString, t.number]),
  });

  export const codec = t.intersection([
    createCodec,
    t.strict({ id: Id, price: t.number }),
  ]);
}

export type BookId = t.TypeOf<typeof BookEntity.Id>;
export type Book = t.TypeOf<typeof BookEntity.codec>;
export type BookCreate = t.TypeOf<typeof BookEntity.createCodec>;

// -------------------------------------------------------------------------------------
// Library
// -------------------------------------------------------------------------------------
export const library = t.array(BookEntity.codec);
export type Library = t.TypeOf<typeof library>;

import { t } from "@prelude";

// -------------------------------------------------------------------------------------
// Book
// -------------------------------------------------------------------------------------

const BookId = t.fromRefinement(
  "BookId",
  (x): x is number => typeof x === "number" && x > 0,
);

export const bookCodec = t.strict({
  id: BookId,
  name: t.NonEmptyString,
  description: t.optionFromNullable(t.NonEmptyString),
  category: t.NonEmptyString,
  price: t.number,
});

export type Book = t.TypeOf<typeof bookCodec>;

// -------------------------------------------------------------------------------------
// Library
// -------------------------------------------------------------------------------------
export const library = t.array(bookCodec);
export type Library = t.TypeOf<typeof library>;

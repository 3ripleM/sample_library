/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookCreate, BookId, Book } from "@core/entities";
import { O, R } from "@prelude";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { pipe } from "fp-ts/lib/function";

const sample_data: Record<BookId, Book> = {
  1: {
    id: 1,
    category: "fiction" as any,
    name: "Court of Mist and Fury" as any,
    description:
      `Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.
As her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.
Bestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.` as any,
    price: 12,
  },
  2: {
    id: 2,
    category: "fiction" as any,
    name: "Looking for Alaska" as any,
    description:
      `Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet). He heads off to the sometimes crazy and anything-but-boring world of Culver Creek Boarding School, and his life becomes the opposite of safe. Because down the hall is Alaska Young. The gorgeous, clever, funny, sexy, self-destructive, screwed up, and utterly fascinating Alaska Young. She is an event unto herself. She pulls Pudge into her world, launches him into the Great Perhaps, and steals his heart. Then. . . .
After. Nothing is ever the same` as any,
    price: 1200,
  },
  3: {
    id: 3,
    category: "fiction" as any,
    name: "Looking for Alaska" as any,
    description:
      `Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet).` as any,
    price: 12444,
  },
};

const initialState: Record<BookId, Book> = sample_data;

let __incrementalId__: number = 4;

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BookCreate>) => {
      const new_store = {
        ...state,
        [__incrementalId__]: { ...action.payload, id: __incrementalId__ },
      };

      __incrementalId__ = __incrementalId__ + 1;

      return new_store;
    },
    edit: (state, action: PayloadAction<Book>) =>
      pipe(
        state,
        R.modifyAt(action.payload.id.toString(), () => action.payload),
        O.getOrElse(() => state),
      ),
    remove: (state, action: PayloadAction<BookId>) =>
      pipe(state, R.deleteAt(action.payload.toString())),
  },
});

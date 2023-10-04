import { configureStore } from "@reduxjs/toolkit";
import { librarySlice } from "./features/library";

export const store = configureStore({
  reducer: { library: librarySlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

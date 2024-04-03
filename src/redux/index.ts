import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user";
import listingsSlice from "./listings";
import submissionsSlice from "./submissions";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    listings: listingsSlice.reducer,
    submissions: submissionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../services/main";
import layoutReducer from "../components/layoutSlice";
import stylingAndDataReducer from "../components/stylingAndDataSlice"

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    layout: layoutReducer,
    stylingAndData: stylingAndDataReducer,
    //counters: countersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
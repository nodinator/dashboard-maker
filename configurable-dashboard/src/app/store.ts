import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { mainApi } from '../services/main';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});



import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from '../features/userInfo/userInfoSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { bouquetsApi } from '../services/bouquets';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    [bouquetsApi.reducerPath]: bouquetsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bouquetsApi.middleware),
});

setupListeners(store.dispatch);

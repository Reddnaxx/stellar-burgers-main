import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  ordersReducer
} from '@slices';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orders: ordersReducer,
  feed: feedReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

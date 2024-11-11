import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export const store = configureStore({
  reducer: { [userSlice.reducerPath]: userSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
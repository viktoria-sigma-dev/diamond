import { configureStore } from '@reduxjs/toolkit';
import diamondReducer from './diamond/diamondSlice';

export const store = configureStore({
  reducer: {
    diamond: diamondReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

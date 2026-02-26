import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import seatReducer from './slices/seatSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    seats: seatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

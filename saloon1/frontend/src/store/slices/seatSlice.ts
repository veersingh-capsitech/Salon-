import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Seat {
  id: string;
  roomId: string;
  row: number;
  column: number;
  status: 'available' | 'occupied' | 'reserved' | 'blocked';
  bookedBy?: string;
}

interface SeatState {
  seats: Seat[];
  loading: boolean;
  error: string | null;
}

const initialState: SeatState = {
  seats: [],
  loading: false,
  error: null,
};

const seatSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeats: (state, action: PayloadAction<Seat[]>) => {
      state.seats = action.payload;
    },
    addSeat: (state, action: PayloadAction<Seat>) => {
      state.seats.push(action.payload);
    },
    updateSeat: (state, action: PayloadAction<Seat>) => {
      const index = state.seats.findIndex((seat) => seat.id === action.payload.id);
      if (index !== -1) {
        state.seats[index] = action.payload;
      }
    },
    deleteSeat: (state, action: PayloadAction<string>) => {
      state.seats = state.seats.filter((seat) => seat.id !== action.payload);
    },
    updateSeatStatus: (
      state,
      action: PayloadAction<{ seatId: string; status: string; bookedBy?: string }>
    ) => {
      const seat = state.seats.find((s) => s.id === action.payload.seatId);
      if (seat) {
        seat.status = action.payload.status as Seat['status'];
        if (action.payload.bookedBy) {
          seat.bookedBy = action.payload.bookedBy;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSeatsByRoom: (state, action: PayloadAction<string>) => {
      state.seats = state.seats.filter((seat) => seat.roomId !== action.payload);
    },
  },
});

export const {
  setSeats,
  addSeat,
  updateSeat,
  deleteSeat,
  updateSeatStatus,
  setLoading,
  setError,
  clearSeatsByRoom,
} = seatSlice.actions;

export default seatSlice.reducer;

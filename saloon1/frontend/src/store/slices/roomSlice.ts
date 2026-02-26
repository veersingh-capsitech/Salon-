import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Room {
  id: string;
  name: string;
  rows: number;
  columns: number;
  createdAt: string;
}

interface RoomState {
  rooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.rooms.findIndex((room) => room.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    deleteRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      if (state.selectedRoom?.id === action.payload) {
        state.selectedRoom = null;
      }
    },
    selectRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  selectRoom,
  setLoading,
  setError,
} = roomSlice.actions;

export default roomSlice.reducer;

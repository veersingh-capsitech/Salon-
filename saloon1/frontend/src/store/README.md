# Redux Store Documentation

## Overview

This project uses Redux with Redux Toolkit for state management. The store is organized into slices for different features.

## Store Structure

### Room Slice (`roomSlice.ts`)

Manages room-related state:

- `rooms` - Array of all rooms
- `selectedRoom` - Currently selected room
- `loading` - Loading state
- `error` - Error messages

**Actions:**

- `setRooms(rooms)` - Set all rooms
- `addRoom(room)` - Add a new room
- `updateRoom(room)` - Update an existing room
- `deleteRoom(roomId)` - Delete a room
- `selectRoom(room)` - Select a room
- `setLoading(boolean)` - Set loading state
- `setError(error)` - Set error message

### Seat Slice (`seatSlice.ts`)

Manages seat-related state:

- `seats` - Array of all seats
- `loading` - Loading state
- `error` - Error messages

**Actions:**

- `setSeats(seats)` - Set all seats
- `addSeat(seat)` - Add a new seat
- `updateSeat(seat)` - Update an existing seat
- `deleteSeat(seatId)` - Delete a seat
- `updateSeatStatus(seatId, status, bookedBy?)` - Update seat status
- `clearSeatsByRoom(roomId)` - Clear all seats for a room
- `setLoading(boolean)` - Set loading state
- `setError(error)` - Set error message

## Using Redux in Components

### Example 1: Reading State

```tsx
import { useAppSelector } from "@/store/hooks";

function MyComponent() {
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const selectedRoom = useAppSelector((state) => state.rooms.selectedRoom);

  return <div>{/* Use rooms and selectedRoom */}</div>;
}
```

### Example 2: Dispatching Actions

```tsx
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectRoom } from "@/store/slices/roomSlice";

function RoomSelector() {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.rooms);

  const handleSelectRoom = (room) => {
    dispatch(selectRoom(room));
  };

  return (
    <div>
      {rooms.map((room) => (
        <button key={room.id} onClick={() => handleSelectRoom(room)}>
          {room.name}
        </button>
      ))}
    </div>
  );
}
```

### Example 3: Handling Seat Status

```tsx
import { useAppDispatch } from "@/store/hooks";
import { updateSeatStatus } from "@/store/slices/seatSlice";

function SeatComponent({ seatId, userId }) {
  const dispatch = useAppDispatch();

  const handleBookSeat = () => {
    dispatch(
      updateSeatStatus({
        seatId,
        status: "occupied",
        bookedBy: userId,
      }),
    );
  };

  return <button onClick={handleBookSeat}>Book Seat</button>;
}
```

## Integration with Backend

When integrating with your backend, use Redux async thunks (from Redux Toolkit) to handle API calls:

```tsx
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/rooms");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
```

## Tips

- Always use `useAppDispatch` and `useAppSelector` hooks instead of the plain Redux hooks for better type safety
- Keep selectors simple; consider creating reusable selector functions for complex queries
- Use Redux DevTools browser extension to debug state changes

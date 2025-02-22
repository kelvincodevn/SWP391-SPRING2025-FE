// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Initially, no user is logged in
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
    },
    clearUser: (state) => {
      state.user = null; // Clear the user data
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
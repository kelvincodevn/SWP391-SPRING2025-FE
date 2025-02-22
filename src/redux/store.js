// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import your userSlice

const store = configureStore({
  reducer: {
    user: userReducer, // Add your user reducer
    // Add other reducers here if needed
  },
});

export default store;
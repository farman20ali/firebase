import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // Initially, no user is set
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload; // Set the current user
    },
    clearUser: (state) => {
      state.currentUser = null; // Clear the user
    },
  },
});

export const { setUser, clearUser } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer

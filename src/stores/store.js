import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice reducer here
  },
});

export default store;

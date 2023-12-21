import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  name: '',
  email: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // TODO check payload if it has nessesary fields
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export const { updateUser, logoutUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;

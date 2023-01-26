import { createSlice } from '@reduxjs/toolkit';

const firstName = JSON.parse(localStorage.getItem('firstName'));

const initialState = {
  isLoggedIn: false,
  name: firstName ? firstName : '',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem('firstName', JSON.stringify(action.payload));
      state.firstName = action.payload;
    },
    SET_USER(state, action) {
      const userProfile = action.payload;
      state.user.firstName = userProfile.firstname;
      state.user.lastName = userProfile.lastName;
      state.user.email = userProfile.email;
      state.user.phone = userProfile.phone;
      state.user.bio = userProfile.bio;
      state.photo = userProfile.photo;
    },
  },
});

export const { SET_NAME, SET_LOGIN, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.firstName;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

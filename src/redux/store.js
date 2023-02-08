import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import productReducer from './feature/product/productSlice';
import filterReducer from './feature/product/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});

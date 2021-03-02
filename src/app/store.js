import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/counter/authSlice';
import { routerReducer } from 'react-router-redux';

export default configureStore({
  reducer: {
    routing: routerReducer,
    auth: authReducer,    
  },
});

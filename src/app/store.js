import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/counter/authSlice';
import { routerReducer } from 'react-router-redux';

export default configureStore({
  reducer: {
    routing: routerReducer,
    auth: authReducer,    
  },
});

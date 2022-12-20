import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import team from './reducers/team';

const reducer = combineReducers({
  team,
});

const store = configureStore({
  reducer,
});

export default store;

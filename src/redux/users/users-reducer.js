import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import usersActions from './users-actions';

const usersListReducer = createReducer([], {
  [usersActions.createUserSuccess]: (state, { payload }) => [...state, payload],
})

const usersReducer = combineReducers({
  items: usersListReducer,
})

export default usersReducer;
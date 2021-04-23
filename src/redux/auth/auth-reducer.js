import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authActions from './auth-actions';

const user = createReducer('', {
  [authActions.loginSuccess]: (_, { payload }) => payload,
  [authActions.logoutSuccess]: () => null,
})

const authReducer = combineReducers({
  user
})

export default authReducer;
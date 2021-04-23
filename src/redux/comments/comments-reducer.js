import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import commentActions from './comments-actions';

const commentsListReducer = createReducer([], {
  [commentActions.addCommentSuccess]: (state, {payload}) => [...state, payload],
})

const commentsReducer = combineReducers({
  items: commentsListReducer,
})

export default commentsReducer
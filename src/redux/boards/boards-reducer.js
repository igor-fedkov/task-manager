import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import boardsActions from './boards-actions';

const boardsListReducer = createReducer([], {
  [boardsActions.addBoardSuccess]: (state, { payload }) => [...state, payload],
  [boardsActions.editBoardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  // [boardsActions.deleteBoardSuccess]: (state, { payload }) => [state.find(({ id }) => id === payload).active = false, ...state.filter(({ id }) => id !== payload)],
  [boardsActions.deleteBoardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
})

const currentBoardReducer = createReducer(null, {
  [boardsActions.setCurrentBoardId]: (_, { payload }) => payload,
})

const boardsReducer = combineReducers({
  items: boardsListReducer,
  currentBoardId: currentBoardReducer,
})

export default boardsReducer;
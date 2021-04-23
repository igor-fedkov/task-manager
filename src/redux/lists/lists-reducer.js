import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import listsActions from './lists-actions';

const listsItemsReducer = createReducer([], {
  [listsActions.addListSuccess]: (state, { payload }) => [...state, payload],
  [listsActions.editListSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  // [listsActions.deleteListuccess]: (state, { payload }) => [state.find(({ id }) => id === payload).active = false, ...state.filter(({ id }) => id !== payload)],
  [listsActions.deleteListSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
})

const currentListIdReducer = createReducer(null, {
  [listsActions.setCurrentListId]: (_, { payload }) => payload,
})

const listsReducer = combineReducers({
  items: listsItemsReducer,
  currentListId: currentListIdReducer,
})

export default listsReducer;
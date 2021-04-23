import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import actionsActions from './actions-actions';

const actionsListReducer = createReducer([], {
  [actionsActions.addActionSuccess]: (state, { payload }) => [...state, payload],
});

const actionsReducer = combineReducers({
  items: actionsListReducer,
});

export default actionsReducer;
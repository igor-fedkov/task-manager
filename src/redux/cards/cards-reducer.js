import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import cardsActions from './cards-actions';

const cardsListReducer = createReducer([], {
  [cardsActions.addCardSuccess]: (state, { payload }) => [...state, payload],
  [cardsActions.deleteCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  [cardsActions.editCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  // [cardsActions.deleteCardsuccess]: (state, { payload }) => [state.find(({ id }) => id === payload).active = false, ...state.filter(({ id }) => id !== payload)],
  
})

const currentCardReducer = createReducer(null, {
  [cardsActions.setCurrentCardId]: (_, { payload }) => payload,
})

const cardsReducer = combineReducers({
  items: cardsListReducer,
  currentCardId: currentCardReducer,
})

export default cardsReducer;
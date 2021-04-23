import { createSelector } from '@reduxjs/toolkit';

import { listsSelectors } from '../';

const getAllCards = state => state.cards.items;

const getCurrentCardId = state => state.cards.currentCardId;

const getCardsOfBoard = createSelector([getAllCards, listsSelectors.getBoardLists],
  (cards, lists) => cards.filter(({ listId }) => lists.find(({ id }) => id === listId)));

const getCurrentCard = createSelector([getAllCards, getCurrentCardId],
  (cards, cardId) => cards.find(({ id }) => id === cardId));

// const getCurrentCardTitle = createSelector([getAllCards, getCurrentCardId],
//   (cards, cardId) => cards.find(({ id }) => id === cardId)?.title);

// const getCurrentCardDescription = createSelector([getAllCards, getCurrentCardId],
//   (cards, cardId) => cards.find(({ id }) => id === cardId)?.description);
  
const cardsSelectors = {
  getCardsOfBoard,
  getCurrentCardId,
  getCurrentCard,
  // getCurrentCardTitle,
  // getCurrentCardDescription,
};

export default cardsSelectors;
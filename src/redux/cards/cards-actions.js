import { createAction } from '@reduxjs/toolkit';

// const addCardsRequest = createAction('cards/addCardsRequest');
const addCardSuccess = createAction('cards/addCardsSuccess');
// const addCardsError = createAction('cards/addCardsError');

// const editCardsRequest = createAction('cards/editCardsRequest');
const editCardSuccess = createAction('cards/editCardsSuccess');
// const editCardsError = createAction('cards/editCardsError');

// const deleteCardsRequest = createAction('cards/deleteCardsRequest');
const deleteCardSuccess = createAction('cards/deleteCardsSuccess');
// const deleteCardsError = createAction('cards/deleteCardsError');

const setCurrentCardId = createAction('cards/setCurrentCardId');

const cardsActions = {
  addCardSuccess,
  editCardSuccess,
  deleteCardSuccess,
  setCurrentCardId,
}

export default cardsActions;
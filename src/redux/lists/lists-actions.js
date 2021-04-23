import { createAction } from '@reduxjs/toolkit';

// const addlistRequest = createAction('lists/addlistRequest');
const addListSuccess = createAction('lists/addListSuccess');
// const addListError = createAction('lists/addListError');

// const editListRequest = createAction('lists/editListRequest');
const editListSuccess = createAction('lists/editListSuccess');
// const editListError = createAction('lists/editListError');

// const deleteListRequest = createAction('lists/deleteListRequest');
const deleteListSuccess = createAction('lists/deleteListSuccess');
// const deleteListError = createAction('lists/deleteListError');

const setCurrentListId = createAction('lists/setCurrentListId');

const listsActions = {
  addListSuccess,
  editListSuccess,
  deleteListSuccess,
  setCurrentListId,
}

export default listsActions;
import { createAction } from '@reduxjs/toolkit';

// const addBoardRequest = createAction('boards/addBoardRequest');
const addBoardSuccess = createAction('boards/addBoardSuccess');
// const addBoardError = createAction('boards/addBoardError');

// const editBoardRequest = createAction('boards/editBoardRequest');
const editBoardSuccess = createAction('boards/editBoardSuccess');
// const editBoardError = createAction('boards/editBoardError');

// const deleteBoardRequest = createAction('boards/deleteBoardRequest');
const deleteBoardSuccess = createAction('boards/deleteBoardSuccess');
// const deleteBoardError = createAction('boards/deleteBoardError');

const setCurrentBoardId = createAction('boards/setCurrentBoardId');

const boardsActions = {
  addBoardSuccess,
  editBoardSuccess,
  deleteBoardSuccess,
  setCurrentBoardId,
}

export default boardsActions;
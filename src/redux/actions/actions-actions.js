import { createAction } from '@reduxjs/toolkit';

// const addActionRequest = createAction('actions/addActionRequest');
const addActionSuccess = createAction('actions/addActionSuccess');
// const addActionError = createAction('actions/addActionError');

const actionsActions = {
  addActionSuccess,
}

export default actionsActions;
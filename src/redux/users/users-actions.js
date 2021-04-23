import { createAction } from "@reduxjs/toolkit";

// const createUserRequest = createAction('users/createUserRequest');
const createUserSuccess = createAction('users/createUserSuccess');
// const createUserError = createAction('users/createUserError');

const usersActions = {
  createUserSuccess,
}

export default usersActions;

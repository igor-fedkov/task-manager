import { createAction } from "@reduxjs/toolkit";

// const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
// const loginError = createAction('auth/loginError');

// const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
// const logoutError = createAction('auth/logoutError');

const authActions = {
  loginSuccess,
  logoutSuccess,
}

export default authActions;
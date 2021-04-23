// import { createSelector } from '@reduxjs/toolkit';

const getUserId = state => state.auth?.user?.id;

const getUserEmail = state => state.auth?.user?.email;

const authSelectors = {
  getUserId,
  getUserEmail,
}

export default authSelectors;
// import { createSelector } from '@reduxjs/toolkit';

const getAllUsers = state => state.users.items;

const usersSelectors = {
  getAllUsers,
}

export default usersSelectors;
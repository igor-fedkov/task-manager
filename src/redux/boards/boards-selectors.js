import { createSelector } from '@reduxjs/toolkit';

import { authSelectors } from '../';

const getAllBoards = state => state.boards.items;

const getCurrentBoardId = state => state.boards.currentBoardId;

// const getOwnBoards = createSelector([getAllBoards, authSelectors.getUserId],
  // (boards, userId) => boards.filter(({owner, active}) => owner === userId && active));

const getOwnBoards = createSelector([getAllBoards, authSelectors.getUserId],
  (boards, userId) => boards
    .filter(({ owner, active }) => owner === userId && active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

// const getOtherBoards = createSelector([getAllBoards, authSelectors.getUserId],
//   (boards, userId) => boards.filter(({ owner, active }) => owner !== userId && active));

const getOtherBoards = createSelector([getAllBoards, authSelectors.getUserId],
  (boards, userId) => boards
    .filter(({ owner, active }) => owner !== userId && active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

const getCurrentBoard = createSelector([getAllBoards, getCurrentBoardId],
  (boards, currentBoardId) => boards.find(({ id }) => id === currentBoardId))

// const getCurrentBoardTitle = createSelector([getAllBoards, getCurrentBoardId],
//   (boards, currentBoardId) => boards.find(({ id }) => id === currentBoardId)?.title);

const boardsSelectors = {
  getAllBoards,
  getCurrentBoardId,
  getCurrentBoard,
  getOwnBoards,
  getOtherBoards,
}

export default boardsSelectors;
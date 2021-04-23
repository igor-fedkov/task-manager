import { createSelector } from '@reduxjs/toolkit';

import { boardsSelectors } from '../';

const getAllLists = state => state.lists.items;

const getCurrentListId = state => state.lists.currentListId;

const getBoardLists = createSelector([getAllLists, boardsSelectors.getCurrentBoardId],
  (lists, currentBoardId) => lists
    .filter(({ boardId }) => boardId === currentBoardId)
);

const getBoardListsActive = createSelector([getAllLists, boardsSelectors.getCurrentBoardId],
  (lists, currentBoardId) => lists
    .filter(({ boardId, active }) => boardId === currentBoardId && active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

const getCurrentList = createSelector([getAllLists, getCurrentListId],
  (lists, currentListId) => lists.find(({ id }) => id === currentListId));

const listsSelectors = {
  getAllLists,
  getBoardLists,
  getBoardListsActive,
  getCurrentListId,
  getCurrentList,
};

export default listsSelectors;
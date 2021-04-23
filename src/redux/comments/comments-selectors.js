import { createSelector } from '@reduxjs/toolkit';

import { cardsSelectors, usersSelectors } from '../';

const getAllComments = state => state.comments.items;

const getCommentsCurrentCard = createSelector([
  getAllComments,
  usersSelectors.getAllUsers,
  cardsSelectors.getCurrentCardId],

  (comments, users, id) =>
    comments
      .filter(({cardId}) => cardId === id)
      .map(comment => {
        const updComment = { ...comment };
        updComment.email = users.find(({ id }) => id === comment.owner).email;
        return updComment;
      })
);

const commentsSelectors = {
  getAllComments,
  getCommentsCurrentCard,
}

export default commentsSelectors;
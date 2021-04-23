import { createSelector } from '@reduxjs/toolkit';

import { howMuchTimeHasPassed } from '../../utils';
import { boardsSelectors, listsSelectors, cardsSelectors, usersSelectors } from '../';
import actionsTypes from '../../actions-types';

const getAllActions = state => state.actions.items;

//-------------------------------------------------------------

const boardActions = createSelector([getAllActions, boardsSelectors.getCurrentBoardId], (actions, boardId) =>
  actions.filter(({ objId }) => objId === boardId));

const listsActions = createSelector([getAllActions, listsSelectors.getBoardLists],
  (actions, lists) => actions.filter(action => lists.find(({ id }) => action.objId === id)));

const cardsActions = createSelector([getAllActions, cardsSelectors.getCardsOfBoard],
  (actions, cards) => actions.filter(action => cards.find(({ id }) => action.objId === id ||
    (action.endPointId === id && action.actionType === actionsTypes.addComment))));

// const commentsActions = createSelector([getAllActions, cardsSelectors.getCardsOfBoard],
//   (actions, cards) => actions.filter(action => cards.find(({ id }) => action.endPointId === id && action.actionType === actionsTypes.addComment)));
//-------------------------------------------------------------

const createCardActivity = ({actions, users, lists, cards}) =>
  actions.map(({ id, userId, objId, endPointId, actionType, date }) => {
    const result = {};
    result.id = id;
    result.userEmail = users.find(({ id }) => id === userId).email;

    switch (actionType) {
      case actionsTypes.add:
        result.actionType = ' added ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ' to ';
        result.endPointTitle = lists.find(({ id }) => id === endPointId).title;
        break;
      case actionsTypes.delete:
        result.actionType = ' removed ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.addComment:
        result.actionType = ' added comment in ';
        result.objTitle = cards.find(({ id }) => id === endPointId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.editDescription:
        result.actionType = ' edited description in ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.move:
        result.actionType = ' moved ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ' to ';
        result.endPointTitle = lists.find(({ id }) => id === endPointId).title;
        break;
      
      default:
        console.log(`unknown action type: ${actionType}`);
    }
    // result.endPointTitle = endPointId ? lists.find(({ id }) => id === endPointId).title : null;
    // result.objTitle = cards.find(({ id }) => id === objId).title;
    result.howLongAgo = howMuchTimeHasPassed(date);
    result.date = date;

    return result;
  });

//-------------------------------------------------------------

const getBoardActivity = createSelector([boardActions, boardsSelectors.getAllBoards, usersSelectors.getAllUsers,],
  (actions, boards, users) =>
    actions.map(({ id, userId, objId, actionType, date }) => {
      const result = {};
      result.id = id;
      result.userEmail = users.find(({ id }) => id === userId).email;

      switch (actionType) {
        case actionsTypes.add:
          result.actionType = ' added this board.';
          result.objTitle = null;
          break;
        
        case actionsTypes.delete:
          result.actionType = ' deleted board ';
          result.objTitle = boards.find(({id}) => id === objId).title;
          break;

        default:
          console.log(`unknown action type: ${actionType}`);
      }
      
      result.pretext = null;
      result.endPointTitle = null;
      result.howLongAgo = howMuchTimeHasPassed(date);
      result.date = date;

      return result;
    })
);

const getListsActivity = createSelector([
  listsActions,
  usersSelectors.getAllUsers,
  listsSelectors.getBoardLists],
  (
    actions,
    users,
    lists) =>

    actions.map(({ id, userId, objId, actionType, date }) => {
      const result = {};
      result.id = id;
      result.userEmail = users.find(({ id }) => id === userId).email;

      switch (actionType) {
        case actionsTypes.add:
          result.actionType = ' added ';
          result.pretext = ' to board.';
          break;
        
        case actionsTypes.delete:
          result.actionType = ' removed ';
          result.pretext = ' from board.';
          break;
        
        case actionsTypes.rename:
          result.actionType = ' renamed list to ';
          result.pretext = '.';
          break;
        
        default:
          console.log(`unknown action type: ${actionType}`);
      }
      result.objTitle = lists.find(({ id }) => id === objId).title;
      result.endPointTitle = null;
      result.howLongAgo = howMuchTimeHasPassed(date);
      result.date = date;

      return result;
    })
);

const getCardsActivity = createSelector([
  cardsActions,
  usersSelectors.getAllUsers,
  listsSelectors.getBoardLists,
  cardsSelectors.getCardsOfBoard],
  (
    actions,
    users,
    lists,
    cards) => createCardActivity({actions, users, lists, cards})
);

//-------------------------------------------------------------

const getActivityOfCurrentCard = createSelector([
  getAllActions,
  cardsSelectors.getCurrentCard,
  usersSelectors.getAllUsers,
  listsSelectors.getAllLists],
  
  (
    actions,
    card,
    users,
    lists) => createCardActivity({
      actions: actions.filter(({ objId, endPointId, actionType }) => objId === card?.id || (endPointId === card?.id && actionType === actionsTypes.addComment)),
      users,
      lists,
      cards: [card]
    }).sort((a, b) => b.date - a.date)
);

const getActivityOfCurrentBoard = createSelector([
  getBoardActivity,
  getListsActivity,
  getCardsActivity],

  (
    boardActivity,
    listsActivity,
    cardsActivity) => {
    
    return [...boardActivity, ...listsActivity, ...cardsActivity].sort((a, b) => b.date - a.date);    
  }
)

const actionsSelectors = {
  getAllActions,
  getActivityOfCurrentCard,
  getActivityOfCurrentBoard,
}

export default actionsSelectors;
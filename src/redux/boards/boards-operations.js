import  {boardsActions, actionsActions} from '../';
import  createObjAction from '../../utils/createObjAction';
import  actionsTypes from '../../actions-types';

const addBoard = board => dispatch => {
  dispatch(boardsActions.addBoardSuccess(board));

  const action = createObjAction({
    userId: board.owner,
    actionType: actionsTypes.add,
    objId: board.id,
    inicial: board.inicial,
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const deleteBoard = actionData => dispatch => {
  dispatch(boardsActions.deleteBoardSuccess(actionData));
  dispatch(boardsActions.setCurrentBoardId(null));

  const action = createObjAction({
    userId: actionData.owner,
    actionType: actionsTypes.delete,
    objId: actionData.id
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const boardsOperations = {
  addBoard,
  deleteBoard,
}

export default boardsOperations
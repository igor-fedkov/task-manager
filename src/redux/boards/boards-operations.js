import  {boardsActions, actionsActions} from '../';
import  createObjAction from '../../utils/createObjAction';
import  actionsTypes from '../../actions-types';

const addBoard = board => dispatch => {

  const action = createObjAction({
    userId: board.owner,
    actionType: actionsTypes.add,
    objId: board.id,
    inicial: board.inicial,
  });

  if (board.inicial) {
    board.inicial = null;
  }    
  
  dispatch(boardsActions.addBoardSuccess(board));
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
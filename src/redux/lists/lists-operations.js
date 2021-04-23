import  {listsActions, actionsActions} from '../';
import  createObjAction from '../../utils/createObjAction';
import  actionsTypes from '../../actions-types';

const addList = list => dispatch => {
  dispatch(listsActions.addListSuccess(list));

  const action = createObjAction({
    userId: list.owner,
    actionType: actionsTypes.add,
    objId: list.id,
    inicial: list.inicial,
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const deleteList = list => dispatch => {
  dispatch(listsActions.deleteListSuccess(list));
  dispatch(listsActions.setCurrentListId(null));

  const action = createObjAction({
    userId: list.owner,
    actionType: actionsTypes.delete,
    objId: list.id
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const renameList = newList => dispatch => {
  dispatch(listsActions.editListSuccess(newList));

  const action = createObjAction({
    userId: newList.owner,
    actionType: actionsTypes.rename,
    objId: newList.id,
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const listsOperations = {
  addList,
  deleteList,
  renameList,
}

export default listsOperations;
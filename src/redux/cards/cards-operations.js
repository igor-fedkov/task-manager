import  {cardsActions, actionsActions} from '../';
import  createObjAction from '../../utils/createObjAction';
import actionsTypes from '../../actions-types';

const addCard = card => dispatch => {
  dispatch(cardsActions.addCardSuccess(card));

  const action = createObjAction({
    userId: card.owner,
    actionType: actionsTypes.add,
    objId: card.id,
    endPointId: card.listId,
    inicial: card.inicial,
  });

  dispatch(actionsActions.addActionSuccess(action));
};

const deleteCard = card => dispatch => {
  dispatch(cardsActions.deleteCardSuccess(card));
  dispatch(cardsActions.setCurrentCardId(null));

  const action = createObjAction({
    userId: card.owner,
    actionType: actionsTypes.delete,
    objId: card.id,
  });

  dispatch(actionsActions.addActionSuccess(action));
};

const addDescription = card => dispatch => {
  dispatch(cardsActions.editCardSuccess(card));

  const action = createObjAction({
    userId: card.owner,
    actionType: actionsTypes.editDescription,
    objId: card.id,
  });

  dispatch(actionsActions.addActionSuccess(action));
};

const moveCard = card => dispatch => {
  dispatch(cardsActions.editCardSuccess(card));

  const action = createObjAction({
    userId: card.owner,
    actionType: actionsTypes.move,
    objId: card.id,
    endPointId: card.listId,
  });

  dispatch(actionsActions.addActionSuccess(action));
}

const cardsOperations = {
  addCard,
  deleteCard,
  addDescription,
  moveCard,
}

export default cardsOperations;


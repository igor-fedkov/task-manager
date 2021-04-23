import  {actionsActions, commentsActions} from '../';
import  createObjAction from '../../utils/createObjAction';
import actionsTypes from '../../actions-types';

const addComment = comment => dispatch => {
  dispatch(commentsActions.addCommentSuccess(comment));

  const action = createObjAction({
    userId: comment.owner,
    actionType: actionsTypes.addComment,
    objId: comment.id,
    endPointId: comment.cardId
  })

  dispatch(actionsActions.addActionSuccess(action));
};

const commentsOperations = {
  addComment,
}

export default commentsOperations;
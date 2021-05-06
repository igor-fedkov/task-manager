import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as inicialData from '../../redux/db.json';

import {
  actionsSelectors,
  authActions,
  globalActions,
  usersActions,
  usersSelectors,
  boardsOperations,
  cardsOperations,
  listsOperations,
} from '../../redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import s from './LoginPage.module.scss';

function LoginPage() {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const users = useSelector(usersSelectors.getAllUsers);
  const actions = useSelector(actionsSelectors.getAllActions);
  

  //-------Load Inicial Data-------
  useEffect(() => {
    if (actions.length) {
      return;
    }

    const { boards, cards, lists, users } = inicialData.default;

    boards.forEach(board => dispatch(boardsOperations.addBoard(board)));
    cards.forEach(card => dispatch(cardsOperations.addCard(card)));
    lists.forEach(list => dispatch(listsOperations.addList(list)));
    users.forEach(user => dispatch(usersActions.createUserSuccess(user)));
  }, [actions, dispatch]);


  //----------onSubmit----------

  const onSubmit = useCallback(e => {
    e.preventDefault();

    const currentUser = users.find(
      user => user.email === email.current.value.toLowerCase() &&
        user.password === password.current.value);
    
    if (!currentUser) {
      dispatch(globalActions.createNotificationText('Wrong user email or password'));
      return;
    }

    const auth = { id: currentUser.id, email: currentUser.email };
    dispatch(authActions.loginSuccess(auth));
  }, [users, dispatch]);

  return (
    <div>      
      <Form onSubmit={onSubmit} className={s.form}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage;
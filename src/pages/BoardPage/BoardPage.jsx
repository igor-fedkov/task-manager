import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { useState, useEffect, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from 'uuid';

import scaleTransition from '../../scss/transitions/scale.module.scss';
import slideTransitions from '../../scss/transitions/slide.module.scss';

import {
  globalActions,
  boardsActions,
  listsOperations,
  boardsSelectors,
  listsSelectors,
  cardsSelectors,
  authSelectors,
  cardsOperations,
} from '../../redux';
import routes from '../../routes';

import { Button } from 'react-bootstrap';
import {
  CardsList,
  AddList,
  ModalCardDetails,
  ModalBoardMenu
} from '../../components';

import s from './BoardPage.module.scss';

function BoardPage() {
  const [listIdForAddCard, setListIdForAddCard] = useState(null);
  const [listIdForRenameList, setListIdForRenameList] = useState(null);
  const [isAddListShow, setIsAddListShow] = useState(false);
  const [isBoardMenuShow, setIsBoardMenuShow] = useState(false);
  const [isCardDetailsShow, setIsCardDetailsShow] = useState(false);

  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const allBoards = useSelector(boardsSelectors.getAllBoards);
  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);
  const currentCard = useSelector(cardsSelectors.getCurrentCard);
  const lists = useSelector(listsSelectors.getBoardListsActive);
  const cards = useSelector(cardsSelectors.getCardsOfBoard);
  const userId = useSelector(authSelectors.getUserId);
  
  const { boardId } = match.params;

  useEffect(() => dispatch(boardsActions.setCurrentBoardId(boardId)), [boardId, dispatch]);
  useEffect(() => {
    if (!allBoards.find(({id, active}) => id === boardId && active)) {
      history.replace(routes.main);
    }
  }, [allBoards, boardId, history]);

  const onToggleAddList = useCallback(() => {
    setIsAddListShow(state => !state);
  }, []);

  const onToggleBoardMenu = useCallback(() => {
    setIsBoardMenuShow(state => !state);
  }, []);

  const onToggleCardDetailsShow = useCallback(() => {
    setIsCardDetailsShow(state => !state);
  }, []);


  //---------onAddList---------
  const onAddList = useCallback(title => {
    if (!title.trim()) {
      dispatch(globalActions.createNotificationText("Nothing to add"));
      return;
    }

    const list = {
      id: uuidv4(),
      boardId,
      title,
      owner: userId,
      active: true,
    }
    dispatch(listsOperations.addList(list));
  }, [boardId, userId, dispatch]);


  //---------onMoveCard---------

  const onMoveCard = useCallback(newListId => {
    if (currentCard.listId === newListId) {
      return;
    }

    const movedCard = {
      ...currentCard,
      listId: newListId,
      owner: userId,
    };

    dispatch(cardsOperations.moveCard(movedCard));
  }, [currentCard, userId, dispatch]);

  return (
    <div className={s.board}>
      <div className={s.container}>
        <div className={s.boardTitleAndMenuBtnContainer}>
          <h1 className={s.title}>{currentBoard?.title}</h1>
          <Button onClick={onToggleBoardMenu} className={s.btnShowMenu} variant="link">Show Menu</Button>

          {isBoardMenuShow &&
            <ModalBoardMenu toggleModalShow={onToggleBoardMenu} />
          }
        </div>

        <TransitionGroup component="ul" className={s.list}>
          {lists.map(list =>
            <CSSTransition
              key={list.id}
              appear={true}
              timeout={200}
              classNames={scaleTransition}
              unmountOnExit
            >
              <li key={list.id} className={s.listItem}>
                <CardsList
                  onShowCardDetails={onToggleCardDetailsShow}
                  onMoveCard={onMoveCard}
                  list={list}
                  cards={cards.filter(({listId, active}) => listId === list.id && active).sort((a, b) => a.title < b.title ? -1 : 1)}
                  listIdForAddCard={listIdForAddCard}
                  setListIdForAddCard={setListIdForAddCard}
                  listIdForRenameList={listIdForRenameList}
                  setListIdForRenameList={setListIdForRenameList}
                />
              </li>
            </CSSTransition>
          )}

          {/* {!isAddListShow && */}
          {isAddListShow 
            ? <CSSTransition
              // key=""
              timeout={200}
              appear={true}
              classNames={scaleTransition}
              unmountOnExit
            >
              <li className={s.listItem}>
                <AddList onAddList={onAddList} onClose={onToggleAddList} />
              </li>
            </CSSTransition>

            : <CSSTransition
                // key="btn add new list"
                timeout={200}
                appear={true}
                classNames={slideTransitions}
                unmountOnExit
              >
              <li className={`${s.listItem} ${s.addNewList}`}>
                <Button
                  onClick={onToggleAddList}
                  className={s.btnCreateList}
                  variant="link"
                  size="sm">
                  Add a list...
                </Button>
              </li>
            </CSSTransition>
          }
        </TransitionGroup>
      </div>

      <ModalCardDetails
        isModalShow={isCardDetailsShow}
        onModalClose={onToggleCardDetailsShow}
      />

      {/* <ModalBoardMenu /> */}

    </div>
  )
}

export default BoardPage;
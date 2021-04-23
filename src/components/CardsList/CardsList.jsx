import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';

import { cardsOperations, authSelectors, globalActions, listsActions, cardsActions, listsOperations, boardsSelectors } from '../../redux';

import { AddList, AddCard } from '../';
import { Button } from 'react-bootstrap';

import s from './CardsList.module.scss';

function CardsList({
  list,
  cards,
  listIdForAddCard,
  setListIdForAddCard,
  listIdForRenameList,
  setListIdForRenameList,
  onShowCardDetails,
  onMoveCard }) {
  const dispatch = useDispatch();

  // const [isRenameListShow, setIsRenameListShow] = useState(false);
  // const [isListMenuShow, setIsListMenuShow] = useState(true);

  const currentUserId = useSelector(authSelectors.getUserId);
  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);


  //---------onAddCard---------

  const onClickOpenAddCard = useCallback(() => setListIdForAddCard(list.id),
    [list.id, setListIdForAddCard]);
  
  const onAddCard = useCallback(title => {
    if (!title.trim()) {
      dispatch(globalActions.createNotificationText("Nothing to add"));
      return;
    }

    const card = {
      id: uuidv4(),
      listId: list.id,
      title,
      owner: currentUserId,
      active: true,
    }
    dispatch(cardsOperations.addCard(card));
  }, [currentUserId, list.id, dispatch]);

  const onCloseAddCard = useCallback(() => {
    setListIdForAddCard(null);
  }, [setListIdForAddCard]);


  //---------onCardDetailsClick---------

  const onCardDetailsClick = useCallback(id => {
    dispatch(cardsActions.setCurrentCardId(id));
    onShowCardDetails();
    dispatch(listsActions.setCurrentListId(list.id));
  }, [list.id, onShowCardDetails, dispatch]);


  //---------onRemaneList---------

  const onOpenRenameListDialog = useCallback(() => {
    if (currentBoard.owner !== currentUserId && list.owner !== currentUserId) {
      dispatch(globalActions.createNotificationText('Access denied.'));
      return;
    }

    setListIdForRenameList(list.id);
  }, [list.id, currentBoard.owner, list.owner, currentUserId, setListIdForRenameList, dispatch]);

  const onRenameList = useCallback(newTitle => {
    if (list.title === newTitle) {
      setListIdForRenameList(null);
      return;
    }

    const newList = { ...list, title: newTitle, owner: currentUserId };
    dispatch(listsOperations.renameList(newList));
    setListIdForRenameList(null);
  }, [list, currentUserId, setListIdForRenameList, dispatch]);

  
  //---------onDeleteList---------

  const onDeleteList = useCallback(() => {
    const dataForDel = {
      ...list,
      owner: currentUserId,
      active: false,
    };
    dispatch(listsOperations.deleteList(dataForDel));
  }, [list, currentUserId, dispatch]);


  //----------Moving Card------------

  const onDragStart = useCallback((e, id) => {
    dispatch(cardsActions.setCurrentCardId(id));
  }, [dispatch]);

  const onDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e, list) => {
    e.preventDefault();

    onMoveCard(list.id);
  }, [onMoveCard]);

  const onDrag = useCallback(e => {
    e.target.firstChild.style.backgroundColor = "#98999b";
  }, [])

 

  return (
    <div
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, list)}
      className={s.cardsListContainer}
    >
      {
        listIdForRenameList !== list.id &&
        <div className={s.listTitleContasiner}>        
          <h2 onDoubleClick={onOpenRenameListDialog} className={s.listTitle}>{list.title}</h2>
          <div className={s.dropdownMenuContainer}>
            <Button className={s.btnMenu} variant="link">
              <span className={`material-icons-outlined ${s.icon}`}>more_horiz</span>
            </Button>
      
            <div className={s.droppdownMenu}>
              <Button onClick={onOpenRenameListDialog} className={s.dropdownMenuBtn} variant="secondary">
                <span className={`material-icons-outlined ${s.iconInside}`}>drive_file_rename_outline</span>
                <span>Rename List</span>
              </Button>
      
              <Button onClick={onDeleteList} className={s.dropdownMenuBtn} variant="secondary">
                <span className={`material-icons-outlined ${s.iconInside}`}>delete_outline</span>
                <span>Remove List</span> 
              </Button>            
            </div>            
          </div>        
        </div>
      }
      
      {listIdForRenameList === list.id &&
        <AddList
        onAddList={onRenameList}
        onClose={() => setListIdForRenameList(null)}
        defaultText={list.title}/>}

      <ul className={s.cardsList}>
        {cards.map(({ id, title }) =>
          <li
            onDrag={onDrag}
            onDragStart={(e) => onDragStart(e, id)}
            
            key={id}
            className={s.cardsListItem}
            draggable={true}>
            
            <button
              onClick={() => onCardDetailsClick(id)}
              className={s.btnOpenCard}>
              <span className={s.cardTitle}>{title}</span>            
              <span className={`material-icons ${s.cardIcon}`}>edit</span>
            </button>
          </li>

          // <li
          //   onDrag={onDrag}
          //   onDragStart={(e) => onDragStart(e, id)}
            
          //   key={id}
          //   className={s.cardsListItem}
          //   draggable={true}>
          //   <p className={s.cardTitle}>{title}</p>
          //   <Button
          //     onClick={() => onCardDetailsClick(id)}
          //     className={s.btnOpenCard}
          //     variant="link"
          //     size="sm">
          //     <span className="material-icons">edit</span>
          //   </Button>
          // </li>
        )}
      </ul>

      {listIdForAddCard !== list.id &&
        <Button
          onClick={onClickOpenAddCard}
          className={s.btnCreateCard}
          variant="link"
          size="sm">
          Add a card...
        </Button>}

      {listIdForAddCard === list.id &&
        <AddCard
          onAddCard={onAddCard}
          onClose={onCloseAddCard}
        />}
    </div>
  )
}

export default CardsList;
import "../styles/List.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import CardEditor from "./CardEditor";
import shortid from "shortid";
import ListEditor from "./ListEditor";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ listId, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const list = useSelector((state) => state.listsById[listId]);
  const dispatch = useDispatch();
  const toggleAddingCard = () => {
    setAddingCard(!addingCard);
  };
  const addCard = async (cardText) => {
    toggleAddingCard();
    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };
  const toggleEditingTitle = () => {
    setEditingTitle(!editingTitle);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const editListTitle = async () => {
    toggleEditingTitle();
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };
  const deleteList = async () => {
    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="List-Title" onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}
          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {addingCard ? (
            <CardEditor onSave={addCard} onCancel={toggleAddingCard} adding />
          ) : (
            <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
              <ion-icon name="add" /> Add a card
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default List;

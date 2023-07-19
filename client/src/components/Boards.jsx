import { Collection } from "./Collection";
import { useEffect, useState, useRef } from "react";
import {
  createBoard,
  getBoards,
  getCardsForEachList,
  createCard,
  createList,
  updateCard,
  deleteCard,
  deleteList,
} from "../FetchRequest";
import "./Boards.css";
import { AddForm } from "./AddForm";
import AddIcon from "@mui/icons-material/Add";
import { BoardLists } from "./BoardLists";
import * as Util from "./util.jsx";

export const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleBoardList, setToggleBoardList] = useState(false);
  const [boardItem, setBoardItem] = useState({});

  useEffect(() => {
    populateBoards();
  }, []);

  const populateBoards = async () => {
    setBoards(await getBoards());
  };

  const addItem = async (item) => {
    console.log("addItem: ", item);
    try {
      const data = await createBoard(item);
      setBoards((prevTodos) => [...prevTodos, data.board]);
    } catch (e) {
      console.log("Error: addItem ", e.message);
    }
  };

  // Add new card for a list
  const createNewCard = async (item, listId) => {
    console.log("createNewCard : item list", item, listId);
    try {
      const data = await createCard(item, listId);
      // Destructure the data array
      setLists((prevLists) => {
        const prevItems = [...prevLists];
        return Util.createCardUpdateList(prevItems, listId, data);
      });
    } catch (e) {
      console.log("Error: createNewCard ", e.message);
    }
  };

  // Edit card for a list
  const editCard = async (cardItem, listId) => {
    console.log("editCard boards: card ", cardItem, listId);
    try {
      const data = await updateCard(cardItem);
      // Destructure and update
      setLists((prevLists) => {
        const prevItems = [...prevLists];
        return Util.editCardUpdateList(prevItems, listId, data, cardItem);
      });
    } catch (e) {
      console.log("Error: editCard ", e.message);
    }
  };

  const removeCard = async (cardItem, listId) => {
    console.log("removeCard boards: card ", cardItem, listId);
    try {
      const data = await deleteCard(cardItem, listId);
      // Destructure and update
      setLists((prevLists) => {
        const prevItems = [...prevLists];
        return Util.deleteCardUpdateList(prevItems, listId, cardItem);
      });
    } catch (e) {
      console.log("Error: editCard ", e.message);
    }
  };

  const removeList = async (list) => {
    console.log("removeList boards: ", list);
    try {
      const data = await deleteList(list);
      // Destructure and update
      setLists((prevLists) => {
        const prevItems = [...prevLists];
        return Util.deleteListUpdateList(prevItems, list);
      });
    } catch (e) {
      console.log("Error: editCard ", e.message);
    }
  };
  const moveCard = (sourceListId, targetListId, sourceIndex, targetIndex) => {
    console.log(
      "moveCard sourceCardId: ",
      sourceListId,
      targetListId,
      sourceIndex,
      targetIndex
    );
    setLists((prevState) => {
      const prevItems = [...prevState];
      return Util.moveCards(
        prevItems,
        sourceListId,
        targetListId,
        sourceIndex,
        targetIndex
      );
    });
  };

  // item => list
  const createNewList = async (item) => {
    console.log("createNewList : item boardId", item, boardItem.board_id);
    try {
      const data = await createList(item, boardItem.board_id);
      console.log("created New List", data);
      // setLists((prevTodos) => [...prevTodos, { ...data.list }]);

      const result = await getCardsForEachList(boardItem);
      console.log("created createNewList ", result);
      setLists(result);
    } catch (e) {
      console.log("Error: createNewList ", e.message);
    }
  };

  //Display list and all cards for boardItem clicked
  const displayLists = async (boardItem) => {
    console.log("displayList: ", boardItem);

    try {
      const result = await getCardsForEachList(boardItem); // api list by boardid
      console.log("result: displayLists ", result);
      setBoardItem(boardItem);
      setLists(result);
    } catch (e) {
      console.log("Error: displayLists ", e.message);
    }
  };

  return (
    <>
      <div className="boards">
        <h1>Your Board</h1>
        <div className="add-form">
          <AddIcon onClick={(e) => setToggle(!toggle)} />
          {toggle && <AddForm addItem={addItem} setToggle={setToggle} />}
          <Collection
            props={boards}
            setToggleBoardList={setToggleBoardList}
            displayLists={displayLists}
          />
        </div>
      </div>
      {toggleBoardList && (
        <BoardLists
          Lists={lists}
          createNewCard={createNewCard}
          createNewList={createNewList}
          editCard={editCard}
          moveCard={moveCard}
          removeCard={removeCard}
          removeList={removeList}
        />
      )}
    </>
  );
};

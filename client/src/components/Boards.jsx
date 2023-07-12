import { Collection } from "./Collection";
import { useEffect, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import {
  createBoard,
  getBoards,
  getCardsForEachList,
  createCard,
  createList,
  updateCard,
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

  // const [{ isOver }, refDrop] = useDrop(() => ({
  //   accept: "text",
  //   drop: (item) => addTextToBoard(item.card_id, item.listId),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));

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
        const copyList = [...prevLists];
        return Util.createCardUpdateList(copyList, listId, data);
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

        // Util.editCardUpdateCardList(prevItems, listId, cardItem, "DND updated");
        return Util.editCardUpdateCardList(prevItems, data, listId, cardItem);
      });
    } catch (e) {
      console.log("Error: editCard ", e.message);
    }
  };

  // Move card within a list
  const moveItem = (dragIndex, hoverIndex, item) => {
    console.log(
      "Boards moveItem : dragIndex, hoverIndex",
      dragIndex,
      hoverIndex,
      item,
      item.list_id
    );

    setLists((prevState) => {
      const prevItems = [...prevState];
      return Util.moveCardsInList(prevItems, item, dragIndex, hoverIndex);
    });
  };

  // const addTextToBoard = (card_id, listId) => {
  //   console.log("addTextToBoard card card_id : ", listId, card_id);
  //   setLists((prevLists) => {
  //     const updatedList = [...prevLists];
  //     const newUpdated = updatedList.map((listElement) => {
  //       if (listElement.list_id === listId) {
  //         // list item
  //         // const prevCardsArray = listElement.cards;
  //         const mCards = listElement.cards.map((card, index) => {
  //           if (card.card_id === card_id) {
  //             return { ...card, card_name: card.card_name };
  //           }
  //           return card;
  //         });
  //         return { ...listElement, cards: [...mCards] };
  //       }
  //       return listElement;
  //     });
  //     console.log("created newUpdated after........", newUpdated);
  //     return newUpdated;
  //   });
  // };

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
      <div className="board-container">
        <div>
          <h1>Your Board</h1>
          <AddIcon className="sidebar" onClick={(e) => setToggle(!toggle)} />
        </div>

        <div>
          {toggle && <AddForm addItem={addItem} setToggle={setToggle} />}
          <Collection
            props={boards}
            setToggleBoardList={setToggleBoardList}
            displayLists={displayLists}
          />
        </div>
      </div>

      <div className="lists-container">
        <div>
          {toggleBoardList && (
            <BoardLists
              Lists={lists}
              createNewCard={createNewCard}
              createNewList={createNewList}
              editCard={editCard}
              moveItem={moveItem}
            />
          )}
        </div>
      </div>
    </>
  );
};

import { Collection } from "./Collection";
import { useEffect, useState } from "react";

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

export const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [Lists, setLists] = useState([]);
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

  // item => card
  const createNewCard = async (item, listId) => {
    console.log("createNewCard : item list", item, listId);
    try {
      const data = await createCard(item, listId);
      // Destructure the data array
      setLists((prevLists) => {
        const updatedList = [...prevLists];

        console.log("new List ", updatedList);

        updatedList.map((listElement) => {
          const listKey = Object.keys(listElement);
          if (Number(listKey) === listId)
            return listElement[listId].cards.push(data.card);
        });

        console.log("created updatedList after forEach........", updatedList);
        return updatedList;
      });
    } catch (e) {
      console.log("Error: createNewCard ", e.message);
    }
  };

  const editCard = async (cardItem, listId) => {
    console.log("editCard boards: card ", cardItem, listId);
    try {
      const data = await updateCard(cardItem, cardItem.card_id);

      // Destructure and setLists data array
      setLists((prevLists) => {
        const updatedList = [...prevLists];
        console.log("new List ", updatedList);

        updatedList.map((listElement) => {
          const listKey = Object.keys(listElement);
          if (Number(listKey) === listId) {
            const prevCardsArray = listElement[listId].cards;

            prevCardsArray.map((card, index, array) => {
              if (Number(card.card_id) === cardItem.card_id) {
                const updatedCard = { ...card, card_name: data.card.card_name };
                array[index] = updatedCard;
                // return updatedCard;
              } else {
                // return card;
              }
            });
          }
        });
        console.log("created updatedList after forEach........", updatedList);
        return updatedList;
      });
    } catch (e) {
      console.log("Error: editCard ", e.message);
    }
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
              Lists={Lists}
              createNewCard={createNewCard}
              createNewList={createNewList}
              editCard={editCard}
            />
          )}
        </div>
      </div>
    </>
  );
};

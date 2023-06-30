import { Collection } from "./Collection";
import { useEffect, useState } from "react";
import { createBoard, getBoards, getListsForBoard } from "../FetchRequest";
import "./Boards.css";
import { AddForm } from "./AddForm";
import AddIcon from "@mui/icons-material/Add";
import { BoardLists } from "./BoardLists";

export const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [Lists, setLists] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleBoardList, setToggleBoardList] = useState(false);

  useEffect(() => {
    console.log("useeffect");
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

  const displayLists = async (item) => {
    console.log("displayList: ", item);
    // api list by boardid
    try {
      setLists(await getListsForBoard(item));
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
        {toggleBoardList && <BoardLists Lists={Lists} />}
      </div>
    </>
  );
};

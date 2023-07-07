import { useState } from "react";
import { TextField } from "@mui/material";

export const Item = ({ item, setToggleBoardList, displayLists }) => {
  const [title, setTitle] = useState(item.board_name);

  const boardItemClick = async (e) => {
    console.log("boardItemClick : ", e.target.value);
    setToggleBoardList(true);
    displayLists(item);
  };

  return (
    <>
      <div className="item-container">
        <TextField
          className="input-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onClick={boardItemClick}
        ></TextField>
      </div>
    </>
  );
};

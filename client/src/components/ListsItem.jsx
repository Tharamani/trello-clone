import { useState } from "react";
import { TextField } from "@mui/material";
import "./ListsItem.css";
import { ListCards } from "./ListCards";

export const ListsItem = ({ item }) => {
  // console.log("ListsItem", { item });
  const [title, setTitle] = useState(item.list_name);

  return (
    <>
      <div className="item-container">
        <TextField
          className="TextField"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
        {<ListCards item={item} />}
      </div>
    </>
  );
};

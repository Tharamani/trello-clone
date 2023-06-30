import { useState } from "react";
import { TextField } from "@mui/material";

export const CardsItem = ({ item }) => {
  // console.log("item", { item });
  const [title, setTitle] = useState(item.card_name);

  return (
    <>
      <div className="card-item-container">
        <TextField
          className="TextField"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
      </div>
    </>
  );
};

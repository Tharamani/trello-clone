import { useState } from "react";
import { TextField, Button } from "@mui/material";

export const AddForm = ({ addItem, setToggle }) => {
  const [title, setTitle] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    const item = { title };

    console.log("submit form", item);
    if (item.title) await addItem(item);
    setTitle("");
    setToggle(false);
  };
  return (
    <>
      <div>
        <form className="form-container" onSubmit={submitForm}>
          <TextField
            placeholder="Enter title..."
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <Button
            olor="primary"
            variant="contained"
            disabled={!title}
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

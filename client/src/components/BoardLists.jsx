import "./BoardLists.css";
import { ListsItem } from "./ListsItem";
import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const BoardLists = ({
  Lists,
  createNewCard,
  createNewList,
  editCard,
  moveItem,
}) => {
  console.log("BoardLists Lists", Lists);

  const [listTitle, setListTitle] = useState("");
  const [toggleAddList, setToggleAddList] = useState(false);
  const [toggleAddAnotherList, setToggleAddAnotherList] = useState(false);

  const addAnotherList = async (event) => {
    event.preventDefault();
    setToggleAddAnotherList(!toggleAddAnotherList);
    const item = { title: listTitle };

    console.log("addAnotherList ", item);
    console.log(" new list title", { item });

    if (item.title) await createNewList(item);
    setListTitle("");
    setToggleAddAnotherList(!toggleAddAnotherList);
  };

  return (
    <>
      <div className="lists">
        <h1>Lists</h1>
        {Lists.map((item) => {
          {
            console.log(" item key : ", item.list_id);
          }
          return (
            <ListsItem
              key={item.list_id}
              list={item}
              listId={item.list_id}
              createNewCard={createNewCard}
              editCard={editCard}
              moveItem={moveItem}
            />
          );
        })}
      </div>

      <div className="add-list">
        <Card
          style={{
            backgroundColor: "#B3AAA8",
            margin: "10px",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {!toggleAddAnotherList && (
                <Button
                  style={{
                    backgroundColor: "#B3AAA8",
                    margin: "10px",
                    color: "#050505",
                  }}
                  type="button"
                  onClick={addAnotherList}
                >
                  Add another List
                </Button>
              )}
            </Typography>
            <Typography variant="h5" component="div">
              {toggleAddAnotherList && (
                <TextField
                  style={{
                    backgroundColor: "#B3AAA8",
                    margin: "10px",
                    color: "black",
                  }}
                  placeholder="Enter title..."
                  id="title"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                />
              )}
              {toggleAddAnotherList && (
                <Button
                  size="small"
                  color="primary"
                  style={{
                    backgroundColor: "#B3AAA8",
                    margin: "10px",
                    color: "#050505",
                  }}
                  type="button"
                  onClick={addAnotherList}
                >
                  Add list
                </Button>
              )}
              {toggleAddAnotherList && <CloseIcon> </CloseIcon>}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

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
  moveCard,
  removeCard,
  removeList,
}) => {
  console.log("BoardLists Lists", Lists);

  const [listTitle, setListTitle] = useState("");
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
      <div className="lists-container">
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
              moveCard={moveCard}
              removeCard={removeCard}
              removeList={removeList}
            />
          );
        })}
        <div className="add-list">
          <Card
            style={{
              backgroundColor: "rgb(230, 118, 161)",
              margin: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {!toggleAddAnotherList && (
                  <Button
                    style={{
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
              <Typography className="list-header" variant="h5" component="div">
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
                {toggleAddAnotherList && (
                  <CloseIcon
                    onClick={(e) => setToggleAddAnotherList(false)}
                  ></CloseIcon>
                )}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import {
  TextField,
  Card,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ListsItem.css";
import { CardsCollection } from "./CardsCollection";

export const ListsItem = ({
  list,
  listId,
  createNewCard,
  editCard,
  moveItem,
}) => {
  // console.log("ListsItem list", { list });

  const [title, setTitle] = useState(list.list_name);
  const [toggleCard, setToggleCard] = useState(false);
  const [closeCardState, setCloseCardState] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const addCard = async (event) => {
    event.preventDefault();
    const item = { title: newTitle };

    console.log("addCard ", item);
    console.log("addCard card new title", { item });

    if (item.title) await createNewCard(item, listId);
    setNewTitle("");
    setToggleCard(!toggleCard);
  };

  const closeCard = (event) => {
    setCloseCardState(!closeCardState);
  };

  return (
    <>
      <div className="item-container">
        <Card style={{ backgroundColor: "#B3AAA8", margin: "10px" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                backgroundColor: "#B3AAA8",
                margin: "10px",
                color: "black",
              }}
              className="TextField"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            >
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {
                <CardsCollection
                  cards={list.cards}
                  editCard={editCard}
                  listId={listId}
                  moveItem={moveItem}
                />
              }
            </Typography>
            <Typography variant="h5" component="div">
              {toggleCard && (
                <TextField
                  placeholder="Enter title..."
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              )}
              {toggleCard && <CloseIcon onClick={closeCard} />}
              {closeCardState && setToggleCard(false)}
              {closeCardState && setCloseCardState(false)}

              <Button
                size="small"
                color="primary"
                style={{
                  backgroundColor: "#B3AAA8",
                  margin: "10px",
                  color: "#050505",
                }}
                type="button"
                onClick={addCard}
              >
                Add a Card
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

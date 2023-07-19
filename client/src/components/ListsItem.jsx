import { useState } from "react";
import {
  TextField,
  Card,
  Typography,
  CardContent,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./ListsItem.css";
import { CardsCollection } from "./CardsCollection";

const options = ["Delete"];

export const ListsItem = ({
  list,
  listId,
  createNewCard,
  editCard,
  moveCard,
  removeCard,
  removeList,
}) => {
  // console.log("ListsItem list", { list });

  const [title, setTitle] = useState(list.list_name);
  const [toggleCard, setToggleCard] = useState(false);
  const [closeCardState, setCloseCardState] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event) => {
    console.log("handleClick");
    // await removeList(listId);
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async (event) => {
    console.log("handleDelete");
    await removeList(list);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addCard = async (event) => {
    // event.preventDefault();
    const item = { title: newTitle };

    console.log("addCard ", item);
    console.log("addCard card new title", { item });

    if (item.title) await createNewCard(item, listId);
    setNewTitle("");
    setToggleCard(!toggleCard);
  };

  const closeCard = () => {
    setCloseCardState(!closeCardState);
  };

  return (
    <>
      <div className="list-cards">
        <Card style={{ backgroundColor: "rgb(243, 238, 240)", margin: "10px" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                backgroundColor: "rgb(243, 238, 240)",
                margin: "10px",
                color: "black",
              }}
              item
              className="TextField"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            >
              {title}

              <MoreVertIcon
                style={{
                  position: "relative",
                  top: "10px",
                  left: "150px",
                  bottom: "10px",
                  padding: "3px",
                }}
                onClick={handleClick}
              />

              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Delete"}
                    onClick={handleDelete}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Typography>
            <Typography variant="h5" component="div">
              {
                <CardsCollection
                  cards={list.cards}
                  editCard={editCard}
                  listId={listId}
                  moveCard={moveCard}
                  list={list}
                  removeCard={removeCard}
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
                  backgroundColor: "rgb(243, 238, 240)",
                  margin: "10px",
                  color: "#050505",
                }}
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

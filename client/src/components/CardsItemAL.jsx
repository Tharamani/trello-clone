import { useState, useRef } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

export const CardsItemAL = ({ cItem, editCard, listId, index, moveCard }) => {
  // console.log("CardsItem", item);

  const [title, setTitle] = useState(() => {
    if (cItem.card_name === null) cItem.card_name = "";
    return cItem.card_name;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: {
      card_id: cItem.card_id,
      card_name: cItem.card_name,
      index,
      list_id: listId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    canDrop: (item) => item.list_id === listId,
    hover(item) {
      if (item.card_id !== cItem.card_id && item.list_id === listId) {
        moveCard(item.list_id, listId, item.index, index);
        item.index = index;
      } else if (item.card_id !== cItem.card_id && item.list_id !== listId) {
        moveCard(item.list_id, listId, item.index, index);
        item.list_id = listId;
        item.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleClose = async (e) => {
    console.log("handleClose ", cItem, title);

    const { card_name, ...otherProps } = cItem;
    const newObj = { title: card_name, ...otherProps };

    if (title !== cItem.card_name) await editCard({ ...newObj, title }, listId);
    setOpen(false);
  };

  return (
    <>
      <div
        className="card-item-container"
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
      >
        {title && (
          <Card style={{ backgroundColor: "white", margin: "10px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                <TextField
                  className="TextField"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  onMouseEnter={(e) => setIsHovered(true)}
                  onMouseLeave={(e) => setIsHovered(false)}
                  onClick={(e) => setOpen(true)}
                ></TextField>
                {isHovered && <EditIcon onClose={handleClose}></EditIcon>}
                <Dialog open={open}>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogContent>
                    <TextField
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

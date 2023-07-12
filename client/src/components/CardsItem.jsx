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

export const CardsItem = ({ item, editCard, listId, moveItem, index }) => {
  // console.log("CardsItem", item);

  const [title, setTitle] = useState(() => {
    if (item.card_name === null) item.card_name = "";
    return item.card_name;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "text",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // const hoverRect = ref.current.getBoundingClientRect();
      // const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      // const mousePosition = monitor.getClientOffset();
      // const hoverClientY = mousePosition.y - hoverRect.top;

      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveItem(dragIndex, hoverIndex, item);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, refDrag] = useDrag(() => ({
    type: "text", // The type of item being dragged
    item: {
      card_id: item.card_id,
      card_name: item.card_name,
      list_id: listId,
      index,
    },
    collect: (monitor) => ({
      //  A function to collect rendering properties
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTextFieldClick = () => {
    setOpen(true);
  };

  const handleClose = async (e) => {
    console.log("handleClose ", item, title);
    // delete item.card_name;

    const { card_name, ...otherProps } = item;
    const newObj = { title: card_name, ...otherProps };

    // console.log("handleClose item ", { ...newObj, title });

    if (title) await editCard({ ...newObj, title }, listId);

    setOpen(false);
  };

  refDrag(drop(ref));
  return (
    <>
      <div
        className="card-item-container"
        ref={ref}
        style={{ opacity, cursor: "move" }}
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleTextFieldClick}
                ></TextField>
                {isHovered && <EditIcon onClose={handleClose}></EditIcon>}
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogContent>
                    {"Title"}
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

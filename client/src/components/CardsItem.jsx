import { useState } from "react";
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

export const CardsItem = ({ item, editCard, listId }) => {
  // console.log("CardsItem", item);
  const [title, setTitle] = useState(item.card_name);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div className="card-item-container">
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
      </div>
    </>
  );
};

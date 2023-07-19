import { useState, useRef } from "react";
// import { CloseIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Card,
  Box,
  Modal,
  Menu,
  MenuItem,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CardsItem = ({
  cItem,
  editCard,
  listId,
  index,
  moveCard,
  list,
  removeCard,
}) => {
  // console.log("CardsItem", item);

  const [title, setTitle] = useState(() => {
    if (cItem.card_name === null) cItem.card_name = "";
    return cItem.card_name;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [isEdited, setIsEdited] = useState(false);

  const handleClose = () => {
    setOpenOptions(false);
  };

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

  const handleEdit = async (e) => {
    console.log("handleEdit ", cItem, title);

    const { card_name, ...otherProps } = cItem;
    const newObj = { title: card_name, ...otherProps };

    if (title !== cItem.card_name) await editCard({ ...newObj, title }, listId);
    setIsHovered(false);
    setOpenOptions(false);
    setIsEdited(false);
  };

  const handleClick = async (e) => {
    console.log("handleClick ", cItem, title);

    // const { card_name, ...otherProps } = cItem;
    // const newObj = { title: card_name, ...otherProps };

    // if (title !== cItem.card_name) await editCard({ ...newObj, title }, listId);
    // setOpenOptions(false);
    // setIsHovered(false);
    setOpenOptions(true);
    setIsEdited(true);
  };

  const handleDelete = async (e) => {
    console.log("handleDelete ");
    await removeCard(cItem, listId);
    // setOpenOptions(false);
    setIsHovered(false);
  };
  return (
    <>
      <div
        className="card-item"
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
        // onMouseLeave={(e) => setOpenOptions(false)}
      >
        {title && (
          <Card style={{ backgroundColor: "white", margin: "10px" }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                onMouseEnter={(e) => setIsHovered(true)}
                onMouseLeave={(e) => setIsHovered(false)}
              >
                {!isEdited && (
                  <TextField
                    className="TextField"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    onClick={(e) => {
                      setOpenModal(true);
                      setOpenEdit(true);
                      // setOpenOptions(false);
                      setIsHovered(false);
                    }}
                  ></TextField>
                )}
                {isHovered && (
                  <EditIcon
                    onClick={handleClick}
                    onMouseLeave={(e) => setIsHovered(false)}
                  ></EditIcon>
                )}
                {openOptions && (
                  <Menu open={openOptions} onClose={handleClose}>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                )}

                {isEdited && (
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "20ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    onMouseLeave={(e) => setIsHovered(false)}
                  >
                    <textarea
                      id="outlined-multiline-flexible"
                      label="Multiline"
                      multiline
                      maxRows={4}
                      data-autosize={true}
                      dir="auto"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    ></textarea>
                    <Button onClick={handleEdit}>Save</Button>
                  </Box>
                )}
                {openModal && (
                  <Modal
                    open={openModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {title}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        is in {list.list_name}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mt: 4 }}
                      >
                        Description : {title}
                      </Typography>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mt: 4 }}
                      >
                        Activity
                      </Typography>
                      <CloseIcon
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                        }}
                        onClick={(e) => setOpenModal(false)}
                      >
                        Close
                      </CloseIcon>
                    </Box>
                  </Modal>
                )}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

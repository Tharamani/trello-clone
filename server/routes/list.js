const express = require("express");
const router = express.Router();
const listController = require("../controller/list");
const cardController = require("../controller/card");

// Router middle-ware for get, post, put, delete request
// router.get("/", listController.getLists);
// router.get("/:id", listController.getListById);
router.put("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

// get, create cards
router.get("/:listId/cards", cardController.getCardsByListId);
router.post("/:listId/cards", cardController.createCard);
// router.put("/:listId/cards/:cardId", cardController.updateCard);
// router.delete("/:listId/cards/:cardId", cardController.deleteCard);
module.exports = router;

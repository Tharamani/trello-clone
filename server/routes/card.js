const express = require("express");
const router = express.Router();
const cardController = require("../controller/card");

// Router middle-ware for get, post, put, delete request
// router.get("/", cardController.getCards);
// router.get("/:id", cardController.getCardById);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;

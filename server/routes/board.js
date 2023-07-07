const express = require("express");
const router = express.Router();
const boardController = require("../controller/board");
const listController = require("../controller/list");

// Router middle-ware for get, post, put, delete request
// create, update, delete board
router.get("/", boardController.getBoards); // get all boards
router.get("/:id", boardController.getBoardById); // get board by id
router.post("/", boardController.createBoard); // create board
router.put("/:id", boardController.updateBoard); // update board
router.delete("/:id", boardController.deleteBoard); // delete board

// get and create list by board id
// router.get("/:id/lists", listController.getListsByBoardId);
router.get("/:id/lists", listController.getCardsForEachList);
router.post("/:id/lists", listController.createList);

module.exports = router;

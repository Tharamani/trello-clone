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

// get and create list
router.get("/:boardId/lists", listController.getListsByBoardId);
router.post("/:boardId/lists", listController.createList);

module.exports = router;

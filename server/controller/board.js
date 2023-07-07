const { errorCodes, errors } = require("../../lib");
const {
  getBoardsModel,
  createBoardModel,
  updateBoardModel,
  deleteBoardModel,
  getBoardByIdModel,
} = require("../model/board"); // import whole object

// Get Board
const getBoards = async (req, res) => {
  try {
    const response = await getBoardsModel();
    return res.json(response); // 200 status is default
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a specific board
const getBoardById = async (req, res) => {
  try {
    const response = await getBoardByIdModel(req.params.id);
    return res.json(response); // 200 status is default
  } catch (error) {
    if (error.message === "Board not found")
      return res.status(404).json({ message: "Board not fournd" });
    return res.status(500).json({ message: "Server error" });
  }
};

//Validate title
const isValid = (title) => {
  if (!title || typeof title !== "string") {
    return false;
  }
  return true;
};

// Create Board
const createBoard = async (req, res) => {
  console.log("create board: ");
  try {
    if (!isValid(req.body.title)) throw new Error("Bad request");
    const response = await createBoardModel(req.body.title);
    console.log("createBoard response", response);
    return res.status(201).json({
      message: "Board created successfully!",
      board: response,
    });
  } catch (error) {
    console.log("Error creating board : ", error.message);

    if (error.message === "Bad request")
      return res.status(400).json({ message: "Bad request" });

    if (error.message === "Error creating board")
      return res.status(404).json({ message: "Error creating board" });

    return res.status(500).json({ message: "Server error" });
  }
};

// Update Board
const updateBoard = async (req, res) => {
  try {
    if (!(await getBoardByIdModel(req.params.id)))
      throw new Error("Board not found");

    if (!isValid(req.body.title)) throw new Error("Bad request");
    const response = await updateBoardModel(req.body.title, req.params.id);

    return res.json({
      message: "Board updated successfully!",
      board: response,
    });
  } catch (error) {
    console.log("Error editBoard  : ", error.message);

    if (error.message === "Error updating board")
      return res.status(404).json({ message: "Error updating board" });
    if (error.message === "Board not found")
      return res.status(404).json({ message: "Board not found" });
    if (error.message === "Bad request")
      return res.status(400).json({ message: "Bad request" });

    return res.status(500).json({ message: "Server error" });
  }
};

//Delete board
const deleteBoard = async (req, res) => {
  try {
    if (!(await getBoardByIdModel(req.params.id)))
      throw new Error("Board not found");
    const response = await deleteBoardModel(req.params.id);

    return res.json({
      message: "Board deleted successfully!",
    });
  } catch (error) {
    console.log("Error editBoard  : ", error.message);

    // if (error.code === errors.BOARD_NOT_FOUND.code)
    //   return res.status(404).json({ message: "Board not found" });
    if (error.message === "Board not found")
      return res.status(404).json({ message: "Board not found" });
    if (error.message === "Error deleting board")
      return res.status(404).json({ message: "Error deleting board" });

    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardById,
  isValid,
};

const { client } = require("../config/db");

// get all boards
const getBoardsModel = async () => {
  const getQuery = "SELECT * FROM trelloschema.boards ORDER BY board_id;";
  const result = await client.query(getQuery);
  if (result.rows) return result.rows;
  throw new Error("Boards not found");
};

// get board by id
const getBoardByIdModel = async (id) => {
  console.log("getBoardByIdModel : ", id);
  const getQuery = "SELECT * FROM trelloschema.boards WHERE board_id = $1;";
  const values = [id];
  const result = await client.query(getQuery, values);
  if (result.rowCount !== 1) throw new Error("Board not found");
  return result.rows[0];
};

// create board
const createBoardModel = async (title) => {
  console.log("createBoardModel : ", title);
  const createQuery =
    "INSERT INTO trelloschema.boards(board_name) VALUES ($1) RETURNING *";
  const values = [title];
  const result = await client.query(createQuery, values);
  if (result.rowCount !== 1) throw new Error("Error creating board");
  return result.rows[0];
};

// update board
const updateBoardModel = async (title, id) => {
  console.log("createBoardModel : ", title, id);
  const updateQuery =
    "UPDATE trelloschema.boards SET board_name = $1 WHERE board_id = $2 RETURNING *";
  const values = [title, id];
  const result = await client.query(updateQuery, values);
  if (result.rowCount !== 1) throw new Error("Error updating board");
  return result.rows[0];
};

// delete board
const deleteBoardModel = async (id) => {
  console.log("deleteBoardModel : ", id);
  const deleteQuery = `DELETE FROM trelloschema.boards
      WHERE board_id = $1;`;
  const values = [id];
  const result = await client.query(deleteQuery, values);
  if (result.rowCount !== 1) throw new Error("Error deleting board");
  return result.rowCount;
};

module.exports = {
  getBoardsModel,
  createBoardModel,
  updateBoardModel,
  deleteBoardModel,
  getBoardByIdModel,
};

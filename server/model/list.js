const { client } = require("../config/db");

// Get list by list id
const getListByIdModel = async (id) => {
  console.log("getListByListIdModel ", id);
  const getQuery = "SELECT * FROM trelloschema.lists WHERE list_id = $1;";
  const values = [id];
  const result = await client.query(getQuery, values);
  if (result.rowCount !== 1) throw new Error("Error retrieving list");
  return result.rows[0];
};

// get all lists with board id
const getListsByBoardIdModel = async (id) => {
  console.log("getListsByBoardIdModel : >>>>>>>>", id);
  const getQuery = "SELECT * FROM trelloschema.lists WHERE board_id = $1;";
  const values = [id];
  const result = await client.query(getQuery, values);
  if (result.rows) return result.rows;
  throw new Error("Error retrieving lists");
};

const createListModel = async (listName, boardId) => {
  console.log("createListModel : >>>>>>>>", listName, boardId);
  const createQuery =
    "INSERT INTO trelloschema.lists(list_name, board_id) VALUES($1, $2) RETURNING *";
  const values = [listName, boardId];
  const result = await client.query(createQuery, values);
  if (result.rowCount !== 1) throw new Error("Error creating list");
  return result.rows[0];
};

const updateListModel = async (title, id) => {
  console.log("updateListModel : >>>>>>>>", title, id);

  const updateQuery =
    "UPDATE trelloschema.lists SET list_name = $1 WHERE list_id = $2 RETURNING *";
  const values = [title, id];
  const result = await client.query(updateQuery, values);
  if (result.rowCount !== 1) throw new Error("Error updating list");
  return result.rows[0];
};

const deleteListModel = async (id) => {
  console.log("deleteListModel : >>>>>>>>", id);
  const deleteQuery = `DELETE FROM trelloschema.lists
      WHERE list_id = $1;`;
  const values = [id];
  const result = await client.query(deleteQuery, values);
  if (result.rowCount !== 1) throw new Error("Error deleting list");
  return result.rowCount;
};

// get all lists
const getListsModel = async () => {
  const getQuery = "SELECT * FROM trelloschema.lists ORDER BY list_id;";
  const result = await client.query(getQuery);
  if (result.rows) return result.rows;
  throw new Error("Error retrieving lists");
};

module.exports = {
  getListsModel,
  getListsByBoardIdModel,
  getListByIdModel,
  createListModel,
  updateListModel,
  deleteListModel,
};

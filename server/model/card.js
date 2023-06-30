const { client } = require("../config/db");

// get all cards with list id
const getCardsByListIdModel = async (id) => {
  const getQuery = "SELECT * FROM trelloschema.cards WHERE list_id = $1;";
  const values = [id];
  const result = await client.query(getQuery, values);
  if (result.rows) return result.rows;
  throw new Error("Error retrieving cards");
};

const createCardModel = async (title, id) => {
  const createQuery =
    "INSERT INTO trelloschema.cards(card_name, list_id) VALUES($1, $2) RETURNING *";
  const values = [title, id];
  const result = await client.query(createQuery, values);
  if (result.rowCount !== 1) throw new Error("Error creating card");
  return result.rows[0];
};

const updateCartModel = async (title, id) => {
  console.log("updateListModel : >>>>>>>>", title, id);
  const updateQuery =
    "UPDATE trelloschema.cards SET card_name = $1 WHERE card_id = $2  RETURNING *";
  const values = [title, id];
  const result = await client.query(updateQuery, values);
  if (result.rowCount !== 1) throw new Error("Error updating card");
  return result.rows[0];
};

const deleteCardModel = async (id) => {
  const deleteQuery = `DELETE FROM trelloschema.cards
      WHERE card_id = $1;`;
  const values = [id];
  const result = await client.query(deleteQuery, values);
  if (result.rowCount !== 1) throw new Error("Error deleting card");
  return result.rowCount;
};

// get all cards
const getCardsModel = async () => {
  console.log("getCardsModel model : >>>>>>>>");
  const getQuery = "SELECT * FROM trelloschema.cards ORDER BY card_id;";
  const result = await client.query(getQuery);
  if (result.rows) return result.rows;
  throw new Error("Error fetching card");
};

// get card by card id
const getCardByCidModel = async (id) => {
  console.log("getCardByCidModel : ", id);
  const getQuery = "SELECT * FROM trelloschema.cards WHERE card_id = $1;";
  const values = [id];
  const result = await client.query(getQuery, values);
  if (result.rowCount !== 1) throw new Error("Error retrieving card");
  return result.rows[0];
};

module.exports = {
  getCardByCidModel,
  getCardsModel,
  createCardModel,
  updateCartModel,
  deleteCardModel,
  getCardsByListIdModel,
};

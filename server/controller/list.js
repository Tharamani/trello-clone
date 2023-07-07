const { getBoardByIdModel } = require("../model/board");
const {
  getListsModel,
  getListsByBoardIdModel,
  getListByIdModel,
  createListModel,
  updateListModel,
  deleteListModel,
  getCardsForEachListModel,
} = require("../model/list");
const { isValid } = require("../controller/board");

// Get all lists for a specific board
const getListsByBoardId = async (req, res) => {
  try {
    if (!(await getBoardByIdModel(req.params.id)))
      throw new Error("Board not found");

    const response = await getListsByBoardIdModel(req.params.id);
    return res.json(response); // 200 status is default
  } catch (error) {
    if (error.message === "Board not found")
      return res.status(404).json({ message: "Board not found" });
    if (error.message === "Error retrieving lists")
      return res.status(404).json({ message: "Error retrieving lists" });

    return res.status(500).json({ message: "Server error" });
  }
};

// Create a new list for a specific board
const createList = async (req, res) => {
  try {
    // if (!(await getBoardByIdModel(req.params.boardId)))
    if (!(await getBoardByIdModel(req.params.id)))
      throw new Error("Board not found");

    if (!isValid(req.body.title)) throw new Error("Bad request");

    const response = await createListModel(req.body.title, req.params.id);

    return res
      .status(201)
      .json({ message: "List created successfully!", list: response });
  } catch (error) {
    console.log("Error creating list : ", error.message);

    if (error.message === "Board not found")
      return res.status(404).json({ message: "Board not found" });
    if (error.message === "Bad request")
      return res.status(400).json({ message: "Bad request" });
    if (error.message === "Error creating list")
      return res.status(404).json({ message: "Error creating list" });

    return res.status(500).json({ message: "Server error" });
  }
};

// Update a list
const updateList = async (req, res) => {
  try {
    if (!(await getListByIdModel(req.params.id)))
      throw new Error("List not found");

    if (!isValid(req.body.title)) throw new Error("Bad request");

    const response = await updateListModel(req.body.title, req.params.id);
    return res.status(201).json({
      message: "List updated successfully!",
      list: response,
    });
  } catch (error) {
    console.log("Error updating list : ", error.message);

    if (error.message === "Error retrieving list") {
      return res.status(404).json({ message: "Error retrieving list" });
    }
    if (error.message === "Bad request") {
      return res.status(400).json({ message: "Bad request" });
    }
    if (error.message === "List not found") {
      return res.status(400).json({ message: "List not found" });
    }
    if (error.message === "Error updating list") {
      return res.status(404).json({ message: "Error updating list" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a list
const deleteList = async (req, res) => {
  try {
    if (!(await getListByIdModel(req.params.id)))
      throw new Error("List not found");

    const response = await deleteListModel(req.params.id);

    return res.json({
      message: "List deleted successfully!",
    });
  } catch (error) {
    console.log("Error deleting list  : ", error.message);

    if (error.message === "Error retrieving list")
      return res.status(404).json({ message: "Error retrieving list" });
    if (error.message === "List not found")
      return res.status(404).json({ message: "List not found" });

    return res.status(500).json({ message: "Server error" });
  }
};

// Get list by list id
const getListById = async (req, res) => {
  try {
    const response = await getListByIdModel(req.params.id);
    return res.json(response); // 200 status is default
  } catch (error) {
    if (error.message === "Error retrieving list")
      return res.status(404).json({ message: "Error retrieving list" });
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Board
const getLists = async (req, res) => {
  try {
    const response = await getListsModel();
    return res.json(response); // 200 status is default
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCardsForEachList = async (req, res) => {
  try {
    const response = await getCardsForEachListModel(req.params.id);
    console.log("getCardsForEachList  : response", response);

    // get all list_id keys into an array
    const uniqueListIds = response
      .map((element) => {
        return element.list_id;
      })
      .filter((value, index, array) => array.indexOf(value) === index);
    console.log("uniqueListIds : ", uniqueListIds);

    const result = {};
    uniqueListIds.map((listIdKey) => {
      console.log("listIdKey : ", listIdKey);

      const cards = [];
      response.map((resObj) => {
        if (listIdKey === resObj.list_id) {
          const card = {};
          card["card_id"] = resObj.card_id;
          card["card_name"] = resObj.card_name;
          cards.push(card);
        }
      });

      const lItem = response.filter((listItem) => {
        if (listIdKey === listItem.list_id) {
          return listItem;
        }
      });

      console.log("listItem.list_name : ", lItem);

      const listObj = {
        list_name: lItem[0].list_name,
        cards: cards,
      };

      result[listIdKey] = listObj;
    });
    console.log("result : ", result);

    const listArray = [];
    for (const key in result) {
      const temp = {};
      console.log("key", key);
      console.log("value", result[key]);
      const value = result[key];
      temp[key] = value;
      listArray.push(temp);
    }

    console.log("getCardsForEachList  : response", listArray);
    return res.json(listArray); // 200 status is default
  } catch (error) {
    if (error.message === "Error retrieving list")
      return res.status(404).json({ message: "Error retrieving list" });
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getListsByBoardId,
  createList,
  updateList,
  deleteList,
  getLists,
  getListById,
  getCardsForEachList,
};

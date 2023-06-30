const {
  getCardByCidModel,
  // getCardsModel,
  getCardsByListIdModel,
  createCardModel,
  updateCartModel,
  deleteCardModel,
  getCardModel,
} = require("../model/card");
const { getListByIdModel } = require("../model/list");
const { isValid } = require("../controller/board");

// Get all card for a specific list
const getCardsByListId = async (req, res) => {
  try {
    if (!(await getListByIdModel(req.params.id)))
      throw new Error("List not found");

    const response = await getCardsByListIdModel(req.params.id);
    return res.json(response); // 200 status is default
  } catch (error) {
    if (error.message === "List not found")
      return res.status(404).json({ message: "List not found" });
    if (error.message === "Error retrieving list")
      return res.status(404).json({ message: "Error retrieving card" });

    return res.status(500).json({ message: "Server error" });
  }
};

// Create a new card in a specific list
const createCard = async (req, res) => {
  try {
    if (!(await getListByIdModel(req.params.id)))
      throw new Error("List not found");

    if (!isValid(req.body.title)) throw new Error("Bad request");

    const response = await createCardModel(req.body.title, req.params.id);
    console.log("createCard controller response >>>>>>>>>>> ", response);

    return res.status(201).json({
      message: "Card created successfully!",
      card: response,
    });
  } catch (error) {
    console.log("Error creating card : ", error.message);

    if (error.message === "List not found")
      return res.status(404).json({ message: "List not found" });
    if (error.message === "Bad request")
      return res.status(400).json({ message: "Bad request" });
    if (error.message === "Error retrieving list")
      return res.status(404).json({ message: "Error retrieving list" });

    return res.status(500).json({ message: "Server error" });
  }
};

//update card by cardid
const updateCard = async (req, res) => {
  try {
    if (!(await getCardByCidModel(req.params.id)))
      throw new Error("Card not found");

    if (!isValid(req.body.title)) throw new Error("Bad request");

    const response = await updateCartModel(req.body.title, req.params.id);

    return res.status(201).json({
      message: "Card updated successfully!",
      card: response,
    });
  } catch (error) {
    console.log("Error updating card  : ", error.message);

    if (error.message === "Error retrieving card")
      return res.status(404).json({ message: "Error retrieving card" });

    if (error.message === "Card not found")
      return res.status(404).json({ message: "Card not found" });

    if (error.message === "Bad request")
      return res.status(400).json({ message: "Bad request" });

    return res.status(500).json({ message: "Server error" });
  }
};

// delete card by cardid
const deleteCard = async (req, res) => {
  try {
    if (!(await getCardByCidModel(req.params.id)))
      throw new Error("Card not found");

    const response = await deleteCardModel(req.params.id);
    console.log("deleteCard controller response >>>>>>>>>>> ", response);

    return res.json({
      message: "Card deleted successfully!",
    });
  } catch (error) {
    console.log("Error deleteCard  : ", error.message);
    if (error.message === "Error retrieving card") {
      return res.status(404).json({ message: "Error retrieving card" });
    }
    if (error.message === "Card not found") {
      return res.status(404).json({ message: "Card not found" });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

// Get cards
const getCards = async (req, res) => {
  try {
    const response = await getCardsModel();
    console.log("getCards controller response >>>>>>>>>>> ", response);
    return res.json(response); // 200 status is default
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get list by id
const getCard = async (req, res) => {
  try {
    console.log("getCard controller  >>>>>>>>>>> ", req.params.id);
    const response = await getCardModel(req.params.id);
    console.log("getCard controller response >>>>>>>>>>> ", response);
    return res.json(response); // 200 status is default
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCardsByListId,
  getCard,
  getCards,
  createCard,
  updateCard,
  deleteCard,
};

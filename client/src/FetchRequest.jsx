const url = "http://localhost:4000";

// Get and set boards
export const getBoards = async () => {
  const response = await fetch(`${url}/boards`);
  const data = await response.json();
  console.log("requestGetBoards : data ", data);
  return data;
};

// Create Board
export const createBoard = async (item) => {
  console.log("fetchRequestCreate...", item);
  if (item.title) {
    const response = await fetch(`${url}/boards`, {
      // api call
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

// Create Board
export const getListsForBoard = async (item) => {
  console.log("getListsForBoard", item);
  if (item.board_id) {
    // const response = await fetch(`${url}/boards/${item.board_id}/lists`);
    const response = await fetch(`${url}/boards/${item.board_id}/lists`);

    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    console.log("getListsForBoard... data", data);
    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

export const getCardsForList = async (item) => {
  console.log("getCardsForList", item);
  const response = await fetch(`${url}/lists/${item.list_id}/cards`);
  const data = await response.json();
  console.log("getCardsForList : data ", data);
  return data;
};

export const getCardsForEachList = async (item) => {
  console.log("getCardsForEachList item", item);
  if (item.board_id) {
    const response = await fetch(`${url}/boards/${item.board_id}/lists`);
    // const response = await fetch(`${url}/boards/${item.board_id}/lists`);

    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    console.log("getCardsForEachList... data", data);
    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

// Create Board
export const createCard = async (item, id) => {
  console.log("fetchRequestCreate... createCards", item, id);
  if (item.title) {
    const response = await fetch(`${url}/lists/${id}/cards`, {
      // using list id create cards
      // api call
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    console.log("fetchRequestCreate... createCards", data);

    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

// Create Board
export const createList = async (item, id) => {
  console.log("fetchRequestCreate... createList", item, id);
  if (item.title) {
    const response = await fetch(`${url}/boards/${id}/lists`, {
      // using board id create list // api call
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    console.log("fetchRequestCreate... createList", data);

    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

// Create Board
export const updateCard = async (item) => {
  console.log("fetchRequest... updateCard", item);
  if (item.title) {
    const response = await fetch(`${url}/cards/${item.card_id}`, {
      // using list id create cards
      // api call
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    console.log("fetchRequest.. updateCard", data);

    return data;
  } else {
    console.log("ERROR: Enter ");
  }
};

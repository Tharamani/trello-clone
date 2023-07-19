export const findListById = (prevItems, pListId) => {
  return prevItems.find((list) => list.list_id === pListId);
};

export const findCardById = (prevCards, pCardId) => {
  return prevCards.find((card) => card.card_id === pCardId);
};

// update lists after adding card
export const createCardUpdateList = (prevItems, listId, data) => {
  findListById(prevItems, listId).cards.push(data.card);
  return prevItems;
};

// update lists, after editing card
export const editCardUpdateList = (prevItems, listId, data, cardItem) => {
  // findListById(prevItems, listId).cards
  // });

  // console.log("prevItems  after........", prevItems);
  // return prevItems;

  const mLists = prevItems.map((listElement) => {
    if (listElement.list_id === listId) {
      // list item
      const cards = listElement.cards.map((card) => {
        if (card.card_id === cardItem.card_id) {
          return { ...card, card_name: data.card.card_name };
        }
        return card;
      });
      return { ...listElement, cards: [...cards] };
    }
    return listElement;
  });
  console.log("editCardUpdateCardList final mLists  ........", mLists);
  return mLists;
};

export const deleteCardUpdateList = (prevItems, listId, cardItem) => {
  const mLists = prevItems.map((listElement) => {
    if (listElement.list_id === listId) {
      // list item
      const cards = listElement.cards.filter((card) => {
        if (card.card_id !== cardItem.card_id) return true;
      });
      return { ...listElement, cards: [...cards] };
    }
    return listElement;
  });

  console.log("deleteCardUpdateCardList  final mLists ........", mLists);
  return mLists;
};

export const deleteListUpdateList = (prevItems, list) => {
  const mLists = prevItems.filter((listElement) => {
    if (listElement.list_id !== list.list_id) return true;
  });

  console.log("deleteListUpdateCardList  final mLists ........", mLists);
  return mLists;
};

export const moveCards = (
  prevItems,
  sourceListId,
  targetListId,
  sourceIndex,
  targetIndex
) => {
  // // Find the source and target lists
  const sourceListIndex = prevItems.indexOf(
    findListById(prevItems, sourceListId)
  );

  const targetListIndex = prevItems.indexOf(
    findListById(prevItems, targetListId)
  );

  // Move the card within the same list
  if (sourceListId === targetListId) {
    const cards = prevItems[sourceListIndex].cards;
    const [movedCard] = cards.splice(sourceIndex, 1);
    cards.splice(targetIndex, 0, movedCard);
  } // Move the card between different lists
  else {
    const sourceCards = prevItems[sourceListIndex].cards;
    const targetCards = prevItems[targetListIndex].cards;
    const [movedCard] = sourceCards.splice(sourceIndex, 1);
    targetCards.splice(targetIndex, 0, movedCard);
  }

  console.log("mLists  prevItems........", prevItems);
  return prevItems;
};

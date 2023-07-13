export const findListById = (prevItems, pListId) => {
  return prevItems.find((list) => list.list_id === pListId);
};

export const findCardById = (prevCards, pCardId) => {
  return prevCards.find((card) => card.card_id === pCardId);
};

// update lists
export const createCardUpdateList = (prevItems, listId, data) => {
  findListById(prevItems, listId).cards.push(data.card);

  console.log("createCardUpdateList mLists........", prevItems);
  return prevItems;
};

// update lists
export const editCardUpdateCardList = (prevItems, data, listId, cardItem) => {
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
  console.log("mLists  after........", mLists);
  return mLists;
};

export const moveCardsLists = (
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

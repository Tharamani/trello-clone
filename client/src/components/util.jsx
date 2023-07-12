export const editCardUpdateCardList = (prevItems, data, listId, cardItem) => {
  const mLists = prevItems.map((listElement) => {
    if (listElement.list_id === listId) {
      // list item
      // const prevCardsArray = listElement.cards;
      const newCards = listElement.cards.map((card) => {
        if (card.card_id === cardItem.card_id) {
          return { ...card, card_name: data.card.card_name };
        }
        return card;
      });
      return { ...listElement, cards: [...newCards] };
    }
    return listElement;
  });
  console.log("newLists  after........", mLists);
  return mLists;
};

// export const editCardUpdateCardList = (prevItems, listId, cardItem, data) => {
//   const updatedList = [
//     ...prevItems,
//     prevItems
//       .find((listElement) => listElement.list_id === listId)
//       .cards.find((card) => {
//         if (card.card_id === cardItem.card_id)
//           return { ...card, card_name: data.card.card_name };
//       }),
//   ];
//   console.log("updatedList>>>>>>>>>>>>", updatedList);
// };

export const createCardUpdateList = (copyList, listId, data) => {
  const mLists = copyList.map((listElement) => {
    if (listElement.list_id === listId) listElement.cards.push(data.card);
    return listElement;
  });

  console.log("createCardUpdateList mLists........", mLists);
  return mLists;
};

export const moveCardsInList = (prevItems, item, dragIndex, hoverIndex) => {
  const mLists = prevItems.map((listElement) => {
    if (listElement.list_id === item.list_id) {
      const dragItem = listElement.cards[dragIndex];
      const hoverItem = listElement.cards[hoverIndex];
      listElement.cards[dragIndex] = hoverItem;
      listElement.cards[hoverIndex] = dragItem;
      return { ...listElement, cards: [...listElement.cards] };
    }
    return listElement;
  });
  console.log("mLists  after........", mLists);
  return mLists;
};

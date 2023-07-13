import { CardsItemAL } from "./CardsItemAL";
// import { CardsItem } from "./CardsItem";

export const CardsCollection = ({ cards, editCard, listId, moveCard }) => {
  // console.log("CardsCollection ", cards);

  return (
    <>
      <div>
        {cards.map((item, index) => {
          return (
            <CardsItemAL
              // <CardsItem
              key={item.card_id}
              cItem={item}
              editCard={editCard}
              listId={listId}
              index={index}
              moveCard={moveCard}
            />
          );
        })}
      </div>
    </>
  );
};

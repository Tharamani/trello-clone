import { CardsItem } from "./CardsItem";

export const CardsCollection = ({ cards, editCard, listId, moveItem }) => {
  // console.log("CardsCollection ", cards);

  return (
    <>
      <div>
        {cards.map((item, index) => {
          return (
            <CardsItem
              key={item.card_id}
              item={item}
              editCard={editCard}
              listId={listId}
              index={index}
              moveItem={moveItem}
            />
          );
        })}
      </div>
    </>
  );
};

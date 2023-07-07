import { CardsItem } from "./CardsItem";

export const CardsCollection = ({ cards, editCard, listId }) => {
  // console.log("CardsCollection ", cards);

  return (
    <>
      <div>
        {cards.map((item) => {
          return (
            <CardsItem
              key={item.card_id}
              item={item}
              editCard={editCard}
              listId={listId}
            />
          );
        })}
      </div>
    </>
  );
};

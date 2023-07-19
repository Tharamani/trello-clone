import { CardsItem } from "./CardsItem";
import "./CardsCollection";

export const CardsCollection = ({
  cards,
  editCard,
  listId,
  moveCard,
  list,
  removeCard,
}) => {
  // console.log("CardsCollection ", cards);

  return (
    <>
      <div>
        {cards.map((item, index) => {
          return (
            <CardsItem
              key={item.card_id}
              cItem={item}
              editCard={editCard}
              listId={listId}
              index={index}
              moveCard={moveCard}
              list={list}
              removeCard={removeCard}
            />
          );
        })}
      </div>
    </>
  );
};

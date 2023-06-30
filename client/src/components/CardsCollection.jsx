import { CardsItem } from "./CardsItem";

export const CardsCollection = ({ cards }) => {
  console.log("CardsCollection props", { cards });
  return (
    <>
      <div>
        {cards.map((item) => {
          return <CardsItem key={item.card_id} item={item} />;
        })}
      </div>
    </>
  );
};

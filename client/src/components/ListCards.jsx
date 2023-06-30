import { useEffect } from "react";
import { getCardsForList } from "../FetchRequest";
import { CardsCollection } from "./CardsCollection";
import { useState } from "react";

export const ListCards = ({ item }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    displayCards(item);
  }, []);

  const displayCards = async (item) => {
    console.log("displayCards: ", item);
    // api card by listid
    try {
      setCards(await getCardsForList(item));
    } catch (e) {
      console.log("Error: displayCards ", e.message);
    }
  };

  return (
    <>
      <div className="cards">
        <CardsCollection cards={cards} />
      </div>
    </>
  );
};

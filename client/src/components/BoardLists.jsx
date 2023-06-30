import "./BoardLists.css";
import { ListsItem } from "./ListsItem";

export const BoardLists = ({ Lists }) => {
  return (
    <>
      <div className="lists">
        <h1>Lists</h1>
        {Lists.map((item) => {
          return <ListsItem key={item.list_id} item={item} />;
        })}
      </div>
    </>
  );
};

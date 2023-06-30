import { Item } from "./Item";

export const Collection = ({ props, setToggleBoardList, displayLists }) => {
  // console.log("Collection props", { props });
  return (
    <>
      <div>
        {props.map((item) => {
          return (
            <Item
              key={item.board_id}
              item={item}
              setToggleBoardList={setToggleBoardList}
              displayLists={displayLists}
            />
          );
        })}
      </div>
    </>
  );
};

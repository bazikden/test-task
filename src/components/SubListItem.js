import React, { useEffect } from "react";
import { ListItem } from "./ListItem";

export const SubListItem = ({ list, note, setRemoveSublist }) => {
  const sublist = list.filter(item => item.to === note.id);
  useEffect(() => {
    sublist.length === 0 ? setRemoveSublist(false) : setRemoveSublist(true);
  }, [sublist, setRemoveSublist]);

  return (
    <ul>
      {sublist.map((item, index, array) => (
        <ListItem key={item.id} note={item} list={array} />
      ))}
    </ul>
  );
};

import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { ListItem } from "./ListItem";
import { GlobalContext } from "../App";

export const NoteList = () => {
  const [text, setText] = useState("");
  const { state, setState } = useContext(GlobalContext);
  const onChange = e => {
    setText(e.target.value);
  };

  const onAddClick = () => {
    setState({
      ...state,
      notes: [...state.notes, { id: uuid(), message: text }]
    });
    setText("");
  };
  return (
    <div style={{ width: "100%" }}>
      <ul>
        {state.notes.map(note => (
          <ListItem key={note.id} note={note} list={state.notes} />
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <input
          style={{ marginLeft: "10px" }}
          onKeyDown={e => e.key === "Enter" && onAddClick(e)}
          value={text}
          type="text"
          onChange={onChange}
        />
        <button style={{ padding: "0 5px" }} onClick={onAddClick}>
          Add
        </button>
      </div>
    </div>
  );
};

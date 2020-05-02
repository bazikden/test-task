import React, { useState, useContext, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { SubListItem } from "./SubListItem";
import { GlobalContext } from "../App";
import { Sidebar } from "./SideBar";
import { findAndDeleteAllChildren } from "../utils/utils";

export const ListItem = ({ note, list }) => {
  const [text, setText] = useState("");
  const [showed, setShowed] = useState(false);
  const [removeSublist, setRemoveSublist] = useState(false);
  const [upDisabled, setUpDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);
  const { state, setState } = useContext(GlobalContext);
  const removeSublistBtn = useRef(null);

  const onChange = e => {
    setText(e.target.value);
  };

  const index = list.indexOf(note);

  useEffect(() => {
    list.indexOf(note) === 0 ? setUpDisabled(true) : setUpDisabled(false);
    list.indexOf(note) === list.length - 1
      ? setDownDisabled(true)
      : setDownDisabled(false);
  }, [index, list, note]);

  const onAddClick = e => {
    e.stopPropagation();
    if (text !== "") {
      const data = { id: uuid(), message: text, to: note.id };
      setState({ ...state, sublist: [...state.sublist, data] });
      setText("");
    } else {
      alert("Enter the text");
    }
  };

  const onItemClick = e => {
    e.stopPropagation();
    list.indexOf(note) === 0 ? setUpDisabled(true) : setUpDisabled(false);
    list.indexOf(note) === list.length - 1
      ? setDownDisabled(true)
      : setDownDisabled(false);
    const activeItem = document.querySelector(".active");
    activeItem && activeItem.classList.remove("active");
    e.currentTarget.classList.add("active");

    document.querySelector(".show-buttons") &&
      document.querySelector(".show-buttons").classList.remove("show-buttons");
    e.currentTarget.firstChild.lastChild.classList.add("show-buttons");

    document.querySelector(".show-removesublist-button") &&
      document
        .querySelector(".show-removesublist-button")
        .classList.remove("show-removesublist-button");
    state.sublist.filter(f => f.to === note.id).length > 0 &&
      removeSublistBtn.current.classList.add("show-removesublist-button");

    setState({ ...state, activeItem: { note, list } });
  };

  const onRemoveSublistClick = e => {
    e.stopPropagation();
    setState({
      ...state,
      sublist: findAndDeleteAllChildren(state.sublist, note)
    });
  };

  return (
    <li onClick={onItemClick}>
      <div
        style={{ display: "flex", justifyContent: "space-between", zIndex: -1 }}
      >
        <div>
          {note.message}
          {removeSublist && (
            <button
              className="removesublist-button show-removesublist-button"
              ref={removeSublistBtn}
              style={{ padding: "0 3px", marginLeft: "10px" }}
              onClick={onRemoveSublistClick}
            >
              Remove sublist{" "}
              <span style={{ color: "red", fontSize: "20px", fontWeight: 700 }}>
                x
              </span>
            </button>
          )}
          {state.sublist.filter(f => f.to === note.id).length === 0 && (
            <button
              onClick={() => setShowed(!showed)}
              style={{ width: "27px", height: "27px", margin: "0 5px 0 15px" }}
            >
              +
            </button>
          )}
        </div>

        <Sidebar
          list={list}
          note={note}
          upDisabled={upDisabled}
          downDisabled={downDisabled}
        />
      </div>

      {showed && (
        <div style={{ marginLeft: "30px", borderLeft: "1px solid black" }}>
          <SubListItem
            list={state.sublist}
            note={note}
            setRemoveSublist={setRemoveSublist}
          />
          <input
            style={{ margin: "10px 0 0 10px" }}
            value={text}
            type="text"
            onChange={onChange}
            onKeyDown={e => e.key === "Enter" && onAddClick(e)}
            autoFocus
          />
          <button
            style={{ marginTop: "10px", padding: "0 5px" }}
            onClick={onAddClick}
          >
            Add
          </button>
        </div>
      )}
    </li>
  );
};

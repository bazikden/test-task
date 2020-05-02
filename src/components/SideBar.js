import React, { useContext } from "react";
import { changePosition, findAndDeleteAllChildren } from "../utils/utils";
import { GlobalContext } from "../App";

export const Sidebar = ({ list, note, upDisabled, downDisabled }) => {
  const { state, setState } = useContext(GlobalContext);

  const onBtnClick = e => {
    e.stopPropagation();
    let action = null;
    if (e.target.classList.contains("up")) {
      action = "up";
    } else {
      action = "down";
    }
    changePosition(list, action, note, state, setState);
  };

  const onBtnDelClick = e => {
    e.stopPropagation();
    const filteredList = findAndDeleteAllChildren(state.sublist, note);
    note.to === undefined
      ? setState({ ...state, notes: state.notes.filter(f => f.id !== note.id) })
      : setState({
          ...state,
          sublist: filteredList.filter(f => f.id !== note.id)
        });
  };

  return (
    <small className="sidebar">
      <button
        style={{ color: "red" }}
        onClick={onBtnDelClick}
        className="sidebar-btn"
      >
        x
      </button>
      <button
        onClick={onBtnClick}
        disabled={upDisabled}
        className={`sidebar-btn up ${upDisabled && "hidden"}`}
      >
        &#8593;
      </button>
      <button
        onClick={onBtnClick}
        className={`sidebar-btn down ${downDisabled && "hidden"}`}
      >
        &#8595;
      </button>
    </small>
  );
};

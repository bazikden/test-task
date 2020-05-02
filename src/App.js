import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { NoteList } from "./components/NoteList";

const initialState = {
  notes: [
    { id: uuid(), message: "Learn React" },
    { id: uuid(), message: "Learn Vue" },
    { id: uuid(), message: "Learn Node JS" },
    { id: uuid(), message: "Learn Angular" }
  ],
  sublist: [],
  activeItem: {},
  position: null
};

export const GlobalContext = React.createContext(initialState);

function App() {
  const [state, setState] = useState(initialState);
  window.state = state;
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <div className="App">
        <h1 style={{ textAlign: "center" }}>User Story</h1>
        <div className="container">
          <NoteList />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

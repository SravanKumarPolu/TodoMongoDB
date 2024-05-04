import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const API_URL = "http://localhost:5038/";
  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = async () => {
    try {
      const response = await fetch(API_URL + "api/todoapp/GetNotes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const addClick = async () => {
    try {
      await fetch(API_URL + "api/todoapp/AddNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNotes: newNote }),
      });
      refreshNotes();
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const deleteClick = async (id) => {
    try {
      await fetch(API_URL + `api/todoapp/DeleteNotes?id=${id}`, {
        method: "DELETE",
      });
      refreshNotes();
    } catch (error) {
      console.error("Error delete note:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo App</h1>
        <input
          id="newNotes"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addClick}>Add Note</button>
        {notes.map((note, index) => (
          <p key={index}>
            <b>*{note.description}</b>&nbsp;
            <button onClick={() => deleteClick(note.id)}>Delete</button>
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;

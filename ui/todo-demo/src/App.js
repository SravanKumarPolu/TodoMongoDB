import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
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
    const newNoteDescription = document.getElementById("newNotes").value;
    try {
      await fetch(API_URL + "api/todoapp/AddNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newNoteDescription }),
      });
      refreshNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const deleteNote = async (id) => {
    try {
      await fetch(API_URL + `api/todoapp/DeleteNote/${id}`, {
        method: "DELETE",
      });
      refreshNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo App</h1>
        <input id="newNotes" /> &nbsp;
        <button onClick={() => addClick()}>Add Note</button>
        {notes.map((note, index) => (
          <p key={index}>
            <b>*{note.description}</b>&nbsp;
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;

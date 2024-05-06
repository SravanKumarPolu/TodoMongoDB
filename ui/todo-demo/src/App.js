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
    <div className=" bg-slate-500 min-h-screen pt-10 md:pt-20 lg:pt-32 xl:pt-40">
      <header className="flex flex-col gap-5 text-center text-yellow-50">
        <h1 className="   font-semibold text-2xl">ToDo App</h1>
        <div className=" flex flex-row justify-center gap-4 align-middle">
          <input
            className=" w-[20rem] text-black xs:w-full px-2 sm:w-full md:w-[20rem] h-[2.5rem] rounded-sm shadow-md"
            id="newNotes"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-sm"
            onClick={addClick}>
            Add Note
          </button>
        </div>
        <div className=" flex w-full flex-col gap-4 justify-center items-center">
          {notes.map((note, index) => (
            <p key={index} className="">
              <span className="flex flex-row px-10 items-center justify-center  text-center  gap-5">
                <b className=" flex-wrap text-left  w-[20rem] ">
                  {note.description}
                </b>
                &nbsp;
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600  shadow-sm"
                  onClick={() => deleteClick(note.id)}>
                  Delete
                </button>
              </span>
            </p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

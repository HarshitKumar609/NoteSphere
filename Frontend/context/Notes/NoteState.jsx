import React, { useState } from "react";
import NotesContext from "./NotesContext";

const Notestate = (props) => {
  const host = "https://note-sphere-five.vercel.app/";
  const notesData = [];

  const [notes, SetNotes] = useState(notesData);

  const getnote = async () => {
    //api call to header
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    SetNotes(json);
  };

  //.....................................Adding notes............................

  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    // If server returns { note: {...} }
    if (json.note) {
      SetNotes(notes.concat(json.note));
    } else {
      // In case server directly returns the note
      SetNotes(notes.concat(json));
    }
  };

  //..................................Delete Note...........................................
  const deleteNote = async (id) => {
    //api call to header
    const response = await fetch(`${host}/api/notes/deleteNote/${id} `, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //logic
    const newNote = notes.filter((note) => {
      return note._id != id;
    });
    SetNotes(newNote);
  };
  //........................edit note.....................
  const edit = async (id, title, description, tag) => {
    //api call to header
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, addnote, deleteNote, edit, getnote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default Notestate;

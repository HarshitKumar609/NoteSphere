import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItems from "./NoteItems";
import Notecontex from "../../context/Notes/NotesContext";
import AddNote from "./AddNote";
import AuthContext from "../../context/AuthContext/AuthContext";
import Alert from "./Alert";

function Note() {
  const Contex = useContext(Notecontex);
  const { notes, getnote } = Contex;
  const { isAuthenticated } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const onDeleteAlert = () => {
    showAlert("success", "Note deleted successfully!");
  };
  const onUpdateAlert = () => {
    showAlert("success", "Note updated successfully!");
  };

  useEffect(() => {
    if (isAuthenticated) {
      getnote();
    }
  }, [isAuthenticated]);

  return (
    <>
      <AddNote />
      {/* for noteitem */}
      <div className="pt-21 px-6 pb-6 text-gray-900 min-h-screen">
        <h2 className="text-4xl font-mono font-bold mb-2">Notes</h2>
        {notes.length === 0 && "No Notes Here Right Now"}

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {notes.map((note) => {
            return (
              <NoteItems
                key={note._id}
                note={note}
                onDeleteAlert={onDeleteAlert}
                onUpdateAlert={onUpdateAlert}
              />
            );
          })}
        </div>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          duration={3000}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}

export default Note;

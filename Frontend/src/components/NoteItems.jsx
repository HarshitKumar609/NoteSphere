import React, { useContext, useState } from "react";
import Notecontex from "../../context/Notes/NotesContext";
import { Trash2, Pencil } from "lucide-react";
import UpdateNoteModal from "./UpdateNoteModal";

function NoteItems(props) {
  const { note, onDeleteAlert, onUpdateAlert } = props;
  const Contex = useContext(Notecontex);
  const { deleteNote } = Contex;

  const [updateModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };
  const tagColors = {
    General: "bg-white text-slate-800 border border-gray-400",
    Work: "bg-blue-100 text-blue-800 border border-blue-300",
    Study: "bg-purple-100 text-purple-800 border border-purple-300",
    Personal: "bg-green-100 text-green-800 border border-green-300",
    Ideas: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    Health: "bg-lime-300 text-green-900 border border-lime-600",
    Important: "bg-red-100 text-red-800 border border-red-300",
    Other: "bg-pink-100 text-pink-800 border border-pink-300",
  };

  return (
    <>
      {/* for displaying notes element */}
      <div className="break-inside-avoid mb-4">
        <div
          className={`${
            tagColors[note.tag]
          } rounded-xl p-4 shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02] min-h-[180px] flex flex-col justify-between`}
        >
          <div>
            <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
              {note.title}
            </h5>
            <code className="font-normal text-gray-700">
              {note.description}
            </code>
          </div>
          <p className="bg-green-300 w-fit py-0.5 px-3 rounded-3xl">
            {note.tag}
          </p>
          <div className="flex flex-row gap-2 cursor-pointer">
            <button
              onClick={() => {
                onDeleteAlert();
                deleteNote(note._id);
              }}
              className="p-1.5 rounded-full bg-black hover:bg-red-200 transition-colors"
              title="Delete"
            >
              <Trash2 size={15} className="text-white hover:text-red-600" />
            </button>
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-full bg-black hover:bg-orange-500 transition-colors"
              title="Edit"
            >
              <Pencil size={15} className="text-gray-100" />
            </button>
          </div>
        </div>
      </div>

      {updateModal && (
        <UpdateNoteModal
          note={note}
          onClose={() => setShowModal(false)}
          onUpdateAlert={onUpdateAlert}
        />
      )}
    </>
  );
}

export default NoteItems;

import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import NotesContext from "../../context/Notes/NotesContext";

const UpdateNoteModal = ({ note, onClose, onUpdateAlert }) => {
  const { edit } = useContext(NotesContext);

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [tag, setTag] = useState(note.tag);

  const handleSubmmit = (e) => {
    e.preventDefault();

    // update note
    edit(note._id, title, description, tag);
    setTimeout(() => {
      onClose();
    }, 500); // 0.5s delay before closing
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Update Note</h2>
        <form onSubmit={handleSubmmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={5}
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={5}
            required
          ></textarea>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tag
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
            <option value="Health">Health</option>
            <option value="Important">Important</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              disabled={title.length < 5 || description.length < 5}
              onClick={onUpdateAlert}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNoteModal;

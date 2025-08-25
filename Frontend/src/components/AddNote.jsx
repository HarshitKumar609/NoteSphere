import React, { useContext, useState } from "react";
import { Plus, X } from "lucide-react";
import NotesContext from "../../context/Notes/NotesContext";
import Alert from "./Alert";
function AddNote() {
  const { addnote } = useContext(NotesContext);

  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const [isOpen, setShowForm] = useState(false); // 👈 state to toggle form

  const handleClick = (e) => {
    e.preventDefault();
    triggerAlert();
    addnote(notes.title, notes.description, notes.tag);
    setNotes({ title: "", description: "", tag: "" });
    setShowForm(false); // hide form after submission (optional)
  };

  const onchange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
  };
  return (
    <div>
      {/* Plus icon */}
      <button
        className="fixed bottom-10 right-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
        onClick={() => setShowForm(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </button>

      {/* Form appears only when showForm is true */}
      <aside
        className={`h-[440px] w-[90%] sm:w-96 bg-gray-900 text-white rounded-2xl shadow-xl fixed bottom-10 right-4 z-40 transform transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="p-6 rounded-lg w-full max-w-md relative">
            <form onSubmit={handleClick}>
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium "
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={notes.title}
                  onChange={onchange}
                  placeholder="Your title"
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 text-black "
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={notes.description}
                  onChange={onchange}
                  placeholder="Add note here"
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 resize-none text-black"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="tag" className="block mb-2 text-sm font-medium">
                  Tag
                </label>
                <select
                  className="w-full px-3 py-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="tag"
                  name="tag"
                  value={notes.tag}
                  onChange={onchange}
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
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                disabled={notes.title.length < 5 || notes.title.length < 5}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </aside>
      {showAlert && (
        <Alert
          type="success"
          message="Note added successfully!"
          duration={3000}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default AddNote;

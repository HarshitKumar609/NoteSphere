import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { House, Info, AlignJustify, X } from "lucide-react";
import AuthContext from "../../context/AuthContext/AuthContext";

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  //logout
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-20 left-5 z-50 ${
          isOpen ? "bg-gray-800" : "bg-black"
        } text-white p-2 rounded-md transition-all duration-300`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <AlignJustify size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-5 rounded-2xl h-[85%] w-48 bg-gray-800 text-white p-6 z-40 transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-0"
        } origin-top-left  flex flex-col`}
      >
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-2 p-4 text-white hover:text-indigo-400 transition"
            onClick={toggleSidebar}
          >
            <House size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center space-x-2 p-3 pt-1 text-white hover:text-indigo-400 transition"
            onClick={toggleSidebar}
          >
            <Info size={24} />
            <span>About</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center  gap-1 text-white hover:text-indigo-400 transition"
            title="Click to logout"
          >
            <img
              src="images.png"
              alt="profile"
              className="w-10  object-cover rounded-2xl"
            />
            Log-out
          </button>
        </nav>
      </aside>
    </>
  );
}

export default MenuBar;

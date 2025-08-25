import React, { use, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NotepadText } from "lucide-react";
import AuthContext from "../../context/AuthContext/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex space-x-8 items-center ">
            <NotepadText className="mr-2 size-8" />
            <Link className="text-xl font-[cursive] " to="/">
              NotoSphere
            </Link>
          </div>

          {/* Profile and buttons */}

          <div className="flex flex-row gap-2  rounded items-center text-white">
            {isAuthenticated ? (
              <>
                <img
                  src="images.png"
                  alt="profile"
                  className="w-10  object-cover rounded-2xl"
                />
                {user ? (
                  <span className="hidden md:block">{user.name}</span>
                ) : (
                  <span className="hidden md:block">Loading...</span> // or nothing at all
                )}
              </>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  login
                </Link>
                <Link
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  to="/signup"
                >
                  Sign-up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

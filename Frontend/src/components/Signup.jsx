import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import Alert from "./Alert";
const Signup = () => {
  const Authcontext = useContext(AuthContext);
  const { signup, error, clearError, isAuthenticated } = Authcontext;
  const [showAlert, setShowAlert] = useState(null);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setShowAlert({
        type: "success",
        message: "Sign-Up Successfully!",
      });
      navigate("/"); // Redirect after showing alert
    }

    if (error) {
      setShowAlert({
        type: "error",
        message: error,
      });
      clearError();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(credentials); // signup will handle success/failure via context
  };
  return (
    <div className="flex items-center justify-center m-15">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="Name"
                className="block mb-2 text-sm font-medium text-white"
              >
                {" "}
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChange}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                onChange={onChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={onChange}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required=""
                minLength={5}
              />
            </div>
            {/* <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required=""
                minLength={5}
              />
            </div> */}

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 "
            >
              Create an account
            </button>
          </form>
          {showAlert && (
            <Alert
              type={showAlert.type}
              message={showAlert.message}
              duration={8000}
              onClose={() => setShowAlert(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import Alert from "./Alert";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(null);
  let navigate = useNavigate();

  const Authcontext = useContext(AuthContext);
  const { login, error, clearError, isAuthenticated } = Authcontext;

  useEffect(() => {
    if (isAuthenticated) {
      setShowAlert({
        type: "success",
        message: "Logged In Successfully!",
      });
      navigate("/"); // Redirect to home after login
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
    login(credentials);
  };

  return (
    <div className="flex items-center justify-center m-15">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Login Account
          </h1>
          <form onSubmit={onSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {showAlert && (
        <Alert
          type={showAlert.type}
          message={showAlert.message}
          duration={8000}
          onClose={() => setShowAlert(null)}
        />
      )}
    </div>
  );
};

export default Login;

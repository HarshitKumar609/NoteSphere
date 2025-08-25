import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "../context/Notes/NoteState";
import MenuBar from "./components/MenuBar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthState from "../context/AuthContext/AuthState";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)",
      }}
    >
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <div>
              <MenuBar />
              <div className="container">
                <Routes>
                  {/* <Route path="/" element={<Navbar />}></Route> */}
                  <Route
                    exact
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route exact path="/About" element={<About />} />
                  <Route exact path="/Login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;

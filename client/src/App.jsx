import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//COMPONENTS
import Heading from "./components/Navbar";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "../src/pages/Register/Register";
import EditProfile from "./pages/Profile/EditProfile";
import ProfilePage from "./pages/Profile/ProfilePage";
import AddCourse from "./pages/Courses/AddCourse";
import EditCourse from "./pages/Courses/EditCourse";

//ROUTES
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "../src/utils/RequireAuth";


function App() {
  //DARK MODE
  const [theme, setTheme] = useState(null);
  axios.defaults.withCredentials = true;

  //CHECKS WHAT IS THE DEVICE PREFERRED MODE
  useEffect(() => {
    if (window.matchMedia("prefers-color-scheme: dark").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //FUNCTION TOGGLE DARK MODE BUTTON - PASSED TO NAVBAR
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`app  ${theme === "dark" ? "bg-black" : "bg-slate-100"}`}
    >
      <AuthProvider>
        <Heading theme={theme} handleThemeSwitch={handleThemeSwitch} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/EditProfile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            }
          />
          <Route
            path="/ProfilePage"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/AddCourse"
            element={
              <RequireAuth>
                <AddCourse />
              </RequireAuth>
            }
          />
          <Route
            path="/EditCourse"
            element={
              <RequireAuth>
                <EditCourse />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

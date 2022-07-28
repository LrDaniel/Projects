import React, { useState, useEffect, createContext } from "react";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Groups from "./pages/Groups";
import Market from "./pages/Market";
import Friends from "./pages/Friends";
import Navbar from "./components/MainPage/Navbar";
import LogAndReg from "./pages/LogAndReg";
import Profile from "./pages/Profile";
import BirthdayFriends from "./components/FriendsPage/BirthdayFriends";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  auth,
  onAuthStateChanged,
  collection,
  db,
  getDocs,
} from "./firebase/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
        navigate("/login");
      }
    });
    if (pathname === "/") {
      navigate("/home");
    }
  }, []);
  return (
    <div className="App">
      <AppContext.Provider value={{ user, users }}>
        {pathname === "/login" ? null : (
          <Navbar user={user} users={users} setUsers={setUsers} />
        )}
        <Routes>
          <Route path="/login" element={<LogAndReg />} />
          <Route path="/home" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/watch/live" element={<Watch />} />
          <Route path="/watch/shows" element={<Watch />} />
          <Route path="/watch/saved" element={<Watch />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/market" element={<Market />} />
          <Route path="/friends/birthdays" element={<BirthdayFriends />} />
          <Route
            path="/profile/:uid"
            element={<Profile user={user} users={users} />}
          />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;

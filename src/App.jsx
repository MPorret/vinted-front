import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

// Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

import Header from "./components/Header";

library.add(faArrowUp, faArrowDown);

function App() {
  const [visible, setVisible] = useState([false, false]);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");

  const [visibleSignUp, visibleLogIn] = visible;

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 15 });
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const isVisible = (i) => {
    const newVisible = [...visible];
    newVisible[i] = !newVisible[i];
    setVisible(newVisible);
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        isVisible={isVisible}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} /> */}
      </Routes>
      {visibleSignUp && (
        <SignUp handleToken={handleToken} isVisible={isVisible} />
      )}
      {visibleLogIn && (
        <LogIn handleToken={handleToken} isVisible={isVisible} />
      )}
    </Router>
  );
}

export default App;

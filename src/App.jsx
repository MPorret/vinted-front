import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

import Header from "./components/Header";

function App() {
  const [visible, setVisible] = useState([false, false]);
  const [visibleSignUp, visibleLogIn] = visible;

  return (
    <Router>
      <Header visible={visible} setVisible={setVisible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} /> */}
      </Routes>
      {visibleSignUp && <SignUp setVisible={setVisible} visible={visible} />}
      {visibleLogIn && <LogIn setVisible={setVisible} visible={visible} />}
    </Router>
  );
}

export default App;

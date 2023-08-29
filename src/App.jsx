import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faUser,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

// Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Paiement from "./pages/Paiement";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

library.add(faArrowUp, faArrowDown, faUser, faPowerOff);

function App() {
  const [visible, setVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 15 });
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const isVisible = () => {
    setVisible(!visible);
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
        setIsModal={setIsModal}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/publish"
          element={
            <Publish
              token={token}
              isVisible={isVisible}
              handleToken={handleToken}
              visible={visible}
              setIsModal={setIsModal}
            />
          }
        />
        <Route path="/paiement" element={<Paiement token={token} />} />
      </Routes>
      <Footer />
      {isModal && (
        <Modal
          handleToken={handleToken}
          isVisible={isVisible}
          visible={visible}
          setIsModal={setIsModal}
        />
      )}
    </Router>
  );
}

export default App;

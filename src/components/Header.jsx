import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

const Header = ({ token, handleToken, setIsModal, search, setSearch }) => {
  return (
    <header>
      <Link to="/">
        <img src="/Vinted_logo.png" alt="" />
      </Link>
      <input
        placeholder="Recherche des articles"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      ></input>
      {!token ? (
        <>
          <button
            className="bigscreen"
            onClick={() => {
              setIsModal(true);
            }}
          >
            Se connecter / S'inscrire
          </button>
          <button
            onClick={() => {
              setIsModal(true);
            }}
            className="smallscreen"
          >
            <FontAwesomeIcon icon="user" />
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            onClick={() => {
              handleToken();
            }}
            className="disconnect bigscreen"
          >
            Se déconnecter
          </button>
          <button
            onClick={() => {
              handleToken();
            }}
            className="smallscreen disconnect"
          >
            <FontAwesomeIcon icon="power-off" />
          </button>
        </>
      )}
      <Link to="/publish">Vends tes articles</Link>
    </header>
  );
};

export default Header;

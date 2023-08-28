import { Link } from "react-router-dom";
// import { useState } from "react";

const Header = ({ token, handleToken, isVisible, search, setSearch }) => {
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
            onClick={() => {
              isVisible("0");
            }}
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              isVisible("1");
            }}
          >
            Se connecter
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            handleToken();
          }}
          className="deconnect"
        >
          Se déconnecter
        </button>
      )}
      <Link to="/publish">Vends tes articles</Link>
    </header>
  );
};

export default Header;

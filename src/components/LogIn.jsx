import { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";

const LogIn = ({ handleToken, isVisible }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event, { action }) => {
    const newData = { ...data };
    switch (action) {
      case "password":
        newData.password = event.target.value;
        break;
      case "email":
        newData.email = event.target.value;
        break;
      default:
        break;
    }

    setData(newData);
  };

  const logIn = async () => {
    try {
      const response = await axios.post(
        "https://site--vinted-backend--hxhcg25qdky2.code.run/user/login",
        data
      );
      handleToken(response.data.token);
      isVisible("1");
    } catch (error) {
      // console.log(error.response.data);

      switch (error.response.data.message) {
        case "Please, complete email and password fields":
          setErrorMessage("Veuillez remplir tous les champs :)");
          break;
        case "Incorrect password or email":
          setErrorMessage("Email ou mot de passe incorrect");
          break;
        case "Incorrect email or password":
          setErrorMessage("Email ou mot de passe incorrect");
          break;
        default:
          break;
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {/* <div
        className="close"
        onClick={() => {
          isVisible("1");
        }}
      >
        X
      </div> */}
      <h3>Se connecter</h3>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={data.email}
        onChange={(event) => {
          handleChange(event, { action: "email" });
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        value={data.password}
        onChange={(event) => {
          handleChange(event, { action: "password" });
        }}
      />
      <button
        onClick={() => {
          logIn();
        }}
      >
        Se connecter
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={() => {
          isVisible("1");
        }}
      >
        Pas encore inscrit ? C'est ici !
      </button>
    </form>
  );
};

export default LogIn;

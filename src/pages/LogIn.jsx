import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const LogIn = ({ setVisible, visible }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        data
      );
      Cookies.set("token", response.data.token, { expires: 14 });
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    const newVisible = [...visible];
    newVisible[1] = false;
    setVisible(newVisible);
  };

  return (
    <div className="modal">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <button onClick={closeModal}>X</button>
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
        <button
          onClick={() => {
            const newVisible = [...visible];
            newVisible[0] = !newVisible[0];
            newVisible[1] = false;
            setVisible(newVisible);
          }}
        >
          Pas encore inscrit ? C'est ici !
        </button>
      </form>
    </div>
  );
};

export default LogIn;

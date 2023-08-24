import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const LogIn = () => {
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
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/login",
      data
    );
    Cookies.set("token", response.data.token, { expires: 14 });
  };

  return (
    <main>
      <h1>Se connecter</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
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
            alert("Vous avez bien été inscrit");
            navigate("/");
          }}
        >
          Se connecter
        </button>
      </form>
      <Link to="/signup">Pas encore inscrit ? C'est ici !</Link>
    </main>
  );
};

export default LogIn;

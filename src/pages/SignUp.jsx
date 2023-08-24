import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleChange = (event, { action }) => {
    const newData = { ...data };
    switch (action) {
      case "password":
        newData.password = event.target.value;
        break;
      case "username":
        newData.username = event.target.value;
        break;
      case "email":
        newData.email = event.target.value;
        break;
      case "newsletter":
        newData.newsletter = !data.newsletter;
        break;
      default:
        break;
    }

    setData(newData);
  };

  const signUp = async () => {
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup",
      data
    );
    Cookies.set("token", response.data.token, { expires: 14 });
  };

  return (
    <main>
      <h1>S'inscrire</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          value={data.username}
          onChange={(event) => {
            handleChange(event, { action: "username" });
          }}
        />
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
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          checked={data.newsletter}
          onChange={(event) => {
            handleChange(event, { action: "newsletter" });
          }}
        />
        <label htmlFor="newsletter">S'inscrire à la newsletter</label>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Confitions et Potilique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button
          onClick={() => {
            signUp();
            alert("Vous avez bien été inscrit");
            navigate("/");
          }}
        >
          S'inscrire
        </button>
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </main>
  );
};

export default SignUp;

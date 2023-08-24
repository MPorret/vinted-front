import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Link to="/">
        <img src="/Vinted_logo.png" alt="" />
      </Link>
      <input placeholder="Recherche des articles"></input>
      {!Cookies.get("token") ? (
        <>
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      ) : (
        <a
          onClick={() => {
            Cookies.remove("token");
            navigate("/");
          }}
        >
          Se déconnecter
        </a>
      )}
      <Link>Vends tes articles</Link>
    </header>
  );
};

export default Header;

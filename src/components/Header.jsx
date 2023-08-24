import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  return (
    <header>
      <Link to="/">
        <img src="/Vinted_logo.png" alt="" />
      </Link>
      <input placeholder="Recherche des articles"></input>
      {!Cookies.get("token") ? (
        <>
          <button
            onClick={() => {
              const newVisible = [...visible];
              newVisible[0] = !newVisible[0];
              setVisible(newVisible);
            }}
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              const newVisible = [...visible];
              newVisible[1] = !newVisible[1];
              setVisible(newVisible);
            }}
          >
            Se connecter
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      )}
      <Link>Vends tes articles</Link>
    </header>
  );
};

export default Header;

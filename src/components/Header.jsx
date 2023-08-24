import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src="/Vinted_logo.png" alt="" />
      </Link>
      <input placeholder="Recherche des articles"></input>
      <Link>S'inscrire</Link>
      <Link>Se connecter</Link>
      <Link>Vends tes articles</Link>
    </header>
  );
};

export default Header;

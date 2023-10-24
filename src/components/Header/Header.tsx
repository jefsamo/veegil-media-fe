import { Link } from "react-router-dom";
import "./header.css";
import { useAuthContext } from "../../context/authcontext";

const Header = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const { logout } = useAuthContext();
  return (
    <div className="header">
      <div className="logo">
        <Link to="">Veegil</Link>
      </div>
      <div className="nav-links">
        <Link to="transfer">Transfer</Link>
        <Link to="withdraw">Withdraw</Link>
        <Link to="history">Transaction history</Link>
        <Link to="/" onClick={logout}>
          {isAuthenticated === "true" ? "Logout" : ""}
        </Link>
      </div>
    </div>
  );
};

export default Header;

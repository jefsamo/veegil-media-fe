import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="inner-home">
        <h1>Welcome to Veegil media</h1>
        <Link to="transfer">Transfer</Link>
      </div>
    </div>
  );
};

export default Home;

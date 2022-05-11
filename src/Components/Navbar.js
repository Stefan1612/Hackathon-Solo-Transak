import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="Navbar">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        Home
      </Link>
      <div>
        <div style={{ fontSize: "50%", textAlign: "auto" }}>
          {props.account}
        </div>
        <div style={{ fontSize: "50%", textAlign: "auto" }}>
          {props.networkName}: {props.networkChainId}
        </div>
      </div>
      <Link to="/Transak" style={{ textDecoration: "none", color: "white" }}>
        Transak
      </Link>
    </div>
  );
};

export default Navbar;

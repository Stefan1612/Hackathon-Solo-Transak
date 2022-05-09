import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="Navbar">
      <div>
        <div style={{ fontSize: "50%", textAlign: "auto" }}>
          {props.account}
        </div>
        <div style={{ fontSize: "50%", textAlign: "auto" }}>
          {props.networkName}: {props.networkChainId}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import CycloneIcon from "@mui/icons-material/Cyclone";

function Navbar() {
  return (
    <>
      <nav>
        <div className="logo">
          <h2>Crypt</h2>
          <CycloneIcon />
        </div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/coins" reloadDocument>
            Coins
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

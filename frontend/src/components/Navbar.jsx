import React from "react";
import Rjwada_logo from "../images/rjwada_logo.svg";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handlelogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div className="navbar">
      <div className="logo-location-input">
        <div className="logo-location">
          <Link to="/">
            <img
              className="logo"
              src={Rjwada_logo}
              alt="Rjwada👑"
              height={"50px"}
            />
          </Link>
          <div className="location-selection">
            {/* <select className="selectlocation">
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurugram">Gurugram</option>
            </select> */}
          </div>
        </div>
        {
          user?
          <h1>Welcome , {user}</h1>:null
        }
        {/* <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search your favourites..."
            className="input"
          />
          <SearchIcon className="searchicon" />
        </div> */}
      </div>
      <div className="menu-wrapper">
        <ul>
          {user && (
            <>
              <Link className="navbar-link link" to={"/"}>
                <li className="nav-links">Menu</li>
              </Link>
              <Link className="navbar-link link" to={"/whishlist"}>
                <li className="nav-links">Whishlist</li>
              </Link>
              <Link className="navbar-link link" to={"/cart"}>
                <li className="nav-links">Cart</li>
              </Link>
              {/* <Link className="navbar-link link" to={"/trackOrder"}>
                <li className="nav-links">TrackOrder</li>
              </Link> */}
              <Link className="navbar-link link" to={"/profile"}>
                <li className="nav-links">Profile</li>
              </Link>
              <Link className="navbar-link link" to={"/"} onClick={handlelogout}>
                <li className="nav-links">Logout</li>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link className="navbar-link link" to={"/"}>
                <li className="nav-links">Menu</li>
              </Link>
              <Link className="navbar-link link" to={"/login"}>
                <li className="nav-links">Login</li>
              </Link>
              <Link className="navbar-link link" to={"/signup"}>
                <li className="nav-links">Sign up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

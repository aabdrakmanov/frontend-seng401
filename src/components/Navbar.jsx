import React from "react";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar() {
  //links need to be filled in
  //bool loggedin should probably take in some actual state from a context probably
  let loggedin = false;
  const navigate = useNavigate();
  const [formText, setFormText] = useState("");
  const [formOption, setFormOption] = useState("All");
  const {logout} = useContext(UserContext)
  const searchFunction = () => {
    if(formText.length === 0){
      navigate("/");
      return
    }
    const url = `/search/${formText}`
    navigate(url);
  };

  const textChange = (e) => {
    setFormText(e.target.value);
  };
  const optionChange = (e) => {
    setFormOption(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg ms-auto bg-dark navbar-dark py-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Appalytics
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
           {localStorage.getItem("username") !== null && <><li className="nav-item">
            <Link className="nav-link" to="/loggedin">
                Apps
              </Link>
                  
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/reviews">
                Review
              </Link>
            </li> </>
              }       
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          {/*displays user profile if logged in, else displays log in and register links */}
          {localStorage.getItem("username") !== null && (
            <img
              src="https://cdn.discordapp.com/emojis/754592761029853184.webp?size=128&quality=lossless"
              className="ms-2 me-1 mt-1 profile-picture"
            />
          )}
          <ul className="navbar-nav ms-2 me-1">
            <li className="nav-item"></li>
            {localStorage.getItem("username") !== null ? (
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("username")}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/">
                      List
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Settings
                    </Link>
                    <Link onClick = {logout} className="dropdown-item" to="/">
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right"></i>Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
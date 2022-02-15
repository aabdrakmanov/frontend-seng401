import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  //links need to be filled in
  //bool loggedin should probably take in some actual state from a context probably
  let loggedin = true;
  const navigate = useNavigate();
  const [formText, setFormText] = useState("");
  const [formOption, setFormOption] = useState("All");

  const searchFunction = () => {
    navigate("/");
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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Apps
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
          </ul>
          {/*displays user profile if logged in, else displays log in and register links */}
          {loggedin && (
            <img
              src="https://cdn.discordapp.com/emojis/754592761029853184.webp?size=128&quality=lossless"
              className="ms-2 me-1 mt-1 profile-picture"
            />
          )}
          <ul className="navbar-nav ms-2 me-1">
            <li className="nav-item"></li>
            {loggedin ? (
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
                    Username
                  </a>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/">
                      List
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Settings
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-box-arrow-in-right"></i>Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          <form
            onSubmit={onFunction}
            className="d-flex justify-content-end navbar-right"
          >
            <select onChange={optionChange} value={formOption} className="mx-1">
              <option value="All">All</option>
              <option value="Apps">Apps</option>
              <option value="Developers">Developers</option>
              <option value="Users">Users</option>
            </select>
            <input
              onChange={textChange}
              value={formText}
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    retype: "",
    type: "developer",
  });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    //probably needs something to validate the details first
    if (
      registerInfo.username.length === 0 ||
      registerInfo.password.length === 0
    ) {
      setError("Username or password cannot be null");
    } else if (registerInfo.password !== registerInfo.retype) {
      setError("Retyped password does not match password");
    } else {
      //add user to database, set state for user as if they logged in
      navigate("/");
    }
  };
  const setInput = (e) => {
    setRegisterInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      };
    });
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mb-3">Sign up</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.username}
                type="text"
                className="w-25 form-control"
                id="username"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.password}
                type="password"
                className=" w-25 form-control"
                id="password"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="retype" className="form-label">
              Retype password
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.retype}
                type="password"
                className=" w-25 form-control"
                id="retype"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="type" className="form-label">
              Sign up as
            </label>
            <div className="d-flex justify-content-center ">
              <select
                onChange={setInput}
                className="form-control w-25"
                id="type"
                value={registerInfo.type}
              >
                <option value="developer">Developer</option>
                <option value="normal user">Normal user</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-secondary">
            Sign up
          </button>
        </form>

        {error.length !== 0 && <p className="mt-1 text-danger">{error}</p>}
        <Link to = "/login">Login instead</Link>
      </div>
    </>
  );
}

export default Signup;

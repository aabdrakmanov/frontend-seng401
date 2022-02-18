import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    //probably needs something to validate the login first
    if (loginInfo.username === "ai" && loginInfo.password === "hayasaka") {
      //probably needs to set the state in the context
      navigate("/");
    } else {
      setError(true);
    }
  };
  const setInput = (e) => {
    setLoginInfo((oldState) => {
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
        <h1 className="mb-3">Log in</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={loginInfo.username}
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
                value={loginInfo.password}
                type="password"
                className=" w-25 form-control"
                id="password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-secondary">
            Login
          </button>
        </form>
        <Link to = "/signup">Sign up instead</Link>
        {error && (
          <p className="mt-1 text-danger">Invalid username or password</p>
        )}
      </div>
    </>
  );
}

export default Login;

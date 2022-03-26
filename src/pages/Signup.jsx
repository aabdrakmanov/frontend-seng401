import React from "react";
import Navbar from "../components/Navbar";
import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../static/css/login.css";
function Signup() {
  const {user,login,logout} = useContext(UserContext)
  
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
    retype: "",
   
  });
  const axios = require('axios')
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    logout()
    e.preventDefault();
    console.log("entered axios fetchss")
    //probably needs something to validate the details first
    if (
      registerInfo.username.length === 0 ||
      registerInfo.password.length === 0 ||
      registerInfo.email.length === 0
    ) {
      setError("Username or password cannot be null");
    } else if (registerInfo.password !== registerInfo.retype) {
      setError("Retyped password does not match password");
    } else {
      
      try{
      const data2 = await axios.post("http://34.127.125.239:5000/signup",
     {username:registerInfo.username,email: registerInfo.email, password: registerInfo.password})
        console.log(data2)
        login(data2.data)
        
    navigate("/loggedin");
      
    }
    catch(error){
      console.log(error)
      setError("invalid sign up")
    }
      
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
  if(localStorage.getItem("username") !== null){
    return <><Navbar/> <div>You are already logged in</div> </>
}
 
  return (
    <>
      <div id="container2" class="container2 signup">
        <div class="row2">
          <div class="col2 align-items-center flex-col2 signup">
            <form action="signup" onSubmit={onSubmit}>
              <div class="form-wrapper align-items-center">
                <div class="form signup">
                  <div class="input-group">
                    <i class="bx bxs-user"></i>
                    <input
                      onChange={setInput}
                      type="text"
                      name="username"
                      id="username"
                      class="form-control"
                      placeholder="Username"
                      autofocus=""
                    />
                  </div>
                  <div class="input-group">
                    <i class="bx bx-mail-send"></i>
                    <input
                      onChange={setInput}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      data-error="Invalid Email Address"
                      required
                    />
                  </div>
                  <div class="input-group">
                    <i class="bx bxs-lock-alt"></i>
                    <input
                      onChange={setInput}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="input-group">
                    <i class="bx bxs-lock-alt"></i>
                    <input
                      onChange={setInput}
                      type="password"
                      id="retype"
                      placeholder="Confirm password"
                    />
                  </div>

                  <button type="submit">Sign Up</button>

                  <p>
                    <span>Already have an account?</span>
                    <Link to="/login">Sign in here</Link>
                  </p>
                  {error.length != 0 && <p>{error}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="row2 content-row2">
          <div class="col2 align-items-center flex-col2"></div>

          <div class="col2 align-items-center flex-col2">
            <div class="img signup"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

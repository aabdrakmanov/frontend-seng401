import React from "react";
import Navbar from "../components/Navbar";
import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../static/css/login.css";
function Signup() {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
    retype: "",
   
  });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
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
      //add user to database, set state for user as if they logged in
      const finalRegister = {
        user:registerInfo.username,
        password:registerInfo.password,
        email:registerInfo.email
      }
      const data2 = await fetch("http://localhost:5000/api/signup",
      {
        method : 'POST',
        body: JSON.stringify(finalRegister),
        headers: { 'Content-Type': 'application/json' }
    }).then((response)=> response.json())
      if(data2.status == 201){
      setUser({company:data2.company, isGeneral: data2.isGeneral})
      navigate("/");
      }
      else {
        setError("Something wrong happened during sign up")
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
                  {error.length != 0 && <p>{setError}</p>}
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

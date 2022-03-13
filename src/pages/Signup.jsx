import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../static/css/login.css"
function Signup() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
    retype: "",
    type: "developer",
  });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    //probably needs something to validate the details first
    if (
      registerInfo.username.length === 0 ||
      registerInfo.password.length === 0 ||
      registerInfo.email.length == 0
    ) {
      setError("username or password cannot be null");
    } else if (registerInfo.password !== registerInfo.retype) {
      setError("retyped password does not match password");
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
     <div id="container2" class="container2 signup">
 
    <div class="row2">
        <div class="col2 align-items-center flex-col2 signup">
            <form action ="signup" onSubmit={onSubmit}>
            <div class="form-wrapper align-items-center">
                <div class="form signup">
                    <div class="input-group">
                        <i class='bx bxs-user'></i>
                        <input onChange = {setInput} type="text" name="username" id="username" class="form-control" placeholder="Username" autofocus=""/>
                    </div>
                    <div class="input-group">
                        <i class='bx bx-mail-send'></i>
                        <input onChange = {setInput} type="email" name = "email" id = "email" placeholder="Email" data-error="Invalid Email Address" required/>
                    </div>
                    <div class="input-group">
                        <i class='bx bxs-lock-alt'></i>
                        <input onChange = {setInput} type="password" name = "password" id = "password" placeholder="Password"/>
                    </div>
                    <div class="input-group">
                        <i class='bx bxs-lock-alt'></i>
                        <input onChange = {setInput} type="password" id = "retype" placeholder="Confirm password"/>
                    </div>




                     <button type="submit" >Sign Up
                  
                     </button>

                    <p>
                        <span>
                            Already have an account?
                        </span>
                        <Link to = "/login">
                            Sign in here
                        </Link>
                    </p>

                </div>


            </div>
                            </form>


        </div>

      
    </div>
    
    <div class="row2 content-row2">
       
        <div class="col2 align-items-center flex-col2">
         
           
        </div>
      
        <div class="col2 align-items-center flex-col2">
            <div class="img signup">

            </div>
            <div class="text signup">
                <h2>
                    Join with us
                </h2>

            </div>
        </div>
       
    </div>
    
</div>

    </>
  );
}

export default Signup;

import React from "react";
import Navbar from "../components/Navbar";
import { useState,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../static/css/login.css"
import UserContext from "../context/UserContext";
function Login() {
    const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    
    //probably needs something to validate the login first
    const data2 = await fetch("http://localhost:5000/api/login").then((response)=> response.json())

    if (loginInfo.username === "ai" && loginInfo.password === "hayasaka") {
      //probably needs to set the state in the context
      navigate("/");
    } else {
      setError(true);
    }
  };
  const setInput = (e) => {
    console.log("hi")
    setLoginInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      };
    });
  };
 
  return (
    <>
   
   <div id="container2" className="container2 signin">
  
    <div className="row2">
        <div className="col2">
           
        </div>

        
        <div className="col2 align-items-center flex-col2 signin">
            <form action ="signin" onSubmit = {onSubmit}>

            <div className="form-wrapper align-items-center">

                <div className="form signin">
                    <div className="input-group">
                        <i className='bx bxs-user'></i>
                        <input onChange = {setInput} type="text" name="inputName" id="username" className="form-control" value = {loginInfo.username} placeholder="Username" autoFocus=""/>
                    </div>
                    <div className="input-group">
                        <i className='bx bxs-lock-alt'></i>
                        <input onChange = {setInput} value = {loginInfo.password} id = "password" type="password" placeholder="Password"/>
                    </div>
                    <button type = "submit">
                        Sign in
                    </button>
                    {error && 
        <p className="invalid-login"> Invalid login info</p>}
                    <p>
                        <b>
                            Forgot password?
                        </b>
                    </p>
                    <p>
                        <span>
                            Don't have an account?
                        </span>
                        <Link to = "/signup"  className="pointer">
                            Sign up here
                        </Link>
                    </p>
                    
                </div>
            </div>
        </form>
            <div className="form-wrapper">

            </div>
        </div>
        
    </div>
    
    <div className="row2 content-row2">
        
        <div className="col2 align-items-center flex-col2">
            <div className="text signin">
                <h2>
                    Applytics
                </h2>

            </div>
            <div className="img signin">

            </div>
        </div>
        
        <div className="col2 align-items-center flex-col2">
            <div className="img sign-up">

            </div>
           
        </div>
        
    </div>
    
</div>
    </>
  );
}

export default Login;

import React from 'react'
import {useState} from 'react'
import axios from 'axios'
function ConfirmPassword({option,newValue,setError,setOption}) {
    const[passwordText,setPasswordText] = useState("")
    const onSubmit = async(e)=>{
        e.preventDefault()
        
        if(option === "email")
        {
            try{
            await axios.put("https://api-login-401.herokuapp.com/changeEmail", {
                username: localStorage.getItem("username"),
                oldEmail: localStorage.getItem("email"),
                newEmail : newValue,
                password:passwordText

            })

            localStorage.setItem("email",newValue)
        }
        catch(error){
            setError("Either incorrect password was input or there's an error on the server")
            return
        }
           
        }
        else if(option === "password"){
        try{
           await axios.put("https://api-login-401.herokuapp.com/changePassword", {
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                newPassword: newValue,
                oldPassword:passwordText

            })}
            catch(error){
                setError("Either incorrect password was input or there's an error on the server")
                return
            }
         


        }
        else if(option === "username"){
            try{
                console.log("ihe")
            await axios.put("https://api-login-401.herokuapp.com/changeUsername", {
                oldUsername: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                newUsername: newValue,
                password:passwordText

            })
            localStorage.setItem("username",newValue)
        }
        catch(error){
            console.log("buh")
            setError("Either incorrect password was input or there's an error on the server")
                return

        }

        }
        setOption(null)
        setError("Updated performed successfully")
    }
   
    
    const changePasswordText = (e)=>{
        setPasswordText(e.target.value)
    }
  return (
    <div className='mt-3'>
        <p> Confirm password to change {option}</p>
        <form  onSubmit = {onSubmit} className='form-group'>
            <div className='d-flex'>
        <label className = "me-2" htmlFor='password'>Confirm password</label>
           <input type = "password" id = "password" onChange=  {changePasswordText} class = "form-control me-1" value = {passwordText}  />
           </div>
           <button type = "submit" className='mt-2 btn btn-primary'>Confirm password</button>
        </form>
    </div>
  )
}

export default ConfirmPassword
import React from 'react'
import {useState} from 'react'
import axios from 'axios'
function ConfirmPassword({option,newValue,setError,setOption}) {
    const[passwordText,setPasswordText] = useState("")
    const onSubmit = async(e)=>{
        e.preventDefault()
        try{
        if(option === "email"){
            await axios.put("https://api-login-401.herokuapp.com/changeEmail", {
                username: localStorage.getItem("username"),
                oldEmail: localStorage.getItem("email"),
                newEmail : newValue,
                password:passwordText

            })

            localStorage.setItem("email",newValue)
           
        }
        else if(option === "password"){
            axios.put("https://api-login-401.herokuapp.com/changePassword", {
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                newPassword: newValue,
                oldPassword:passwordText

            })
         


        }
        else if(option === "username"){
            axios.put("https://api-login-401.herokuapp.com/changeUsername", {
                oldUsername: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                newUsername: newValue,
                password:passwordText

            })
            localStorage.setItem("username",newValue)
         

        }
        setOption(null)
        setError("Updated performed successfully")
    }
    catch(error){
        setOption(null)
        setError("something went wrong")
    }
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
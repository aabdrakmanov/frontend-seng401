import React from 'react'
import {useState,useRef} from 'react'
import ConfirmPassword from '../components/ConfirmPassword';
import Navbar from "../components/Navbar";
function UserProfile() {
    const isMounted = useRef(true)
    
    const [emailText,setEmailText] = useState(localStorage.getItem("email"))
    const [userText,setUserText] = useState(localStorage.getItem("username"))
    const [newPasswordText,setNewPasswordText] = useState("")
   
    const [error,setError] = useState("")
    const [option,setOption] = useState(null)
    const [newValue,setNewValue] = useState("")
    
    if(localStorage.getItem("username") === null){
        return (<><Navbar/><div>You arent logged in </div></>)
    }
  

   
const changeUserText = (e)=>{
  setUserText(e.target.value)
}
    
    const changeEmailText = (e)=>{
        setEmailText(e.target.value)
    }

   

    

    const changeNewPasswordText = (e)=>{
      setNewPasswordText(e.target.value)
    }

    const submitEmail = (e)=>{
      if((emailText.length  == 0 || emailText == localStorage.getItem("email"))){
        setError("New email cannot be blank or the same")
        return
      }
      setOption("email")
      setNewValue(emailText)

    }

    const submitUsername = (e)=>{
      if((userText.length  == 0 || userText == localStorage.getItem("username"))){
        setError("New username cannot be blank or the same")
        return
      }
      setOption("username")
      setNewValue(userText)

    }
    const submitPassword = (e)=>{
      if(newPasswordText.length  == 0){
        setError("New password cannot be blank")
        return
      }
      setOption("password")
      setNewValue(newPasswordText)

    }

    
  return (
    <div><Navbar/><div className = "container">
      <p>Note that password must be confirmed to submit any change </p>
        <div className = "form-group my-1 d-flex">
        
        <label className = "me-2" htmlFor='username'>Username</label>
           <input id = "username" onChange=  {changeUserText} class = "form-control me-1" value = {userText}  />
           
                 <button  onClick = {submitUsername} class = "btn btn-primary"> Submit</button>
                
             </div>
             <div className = "form-group my-1 d-flex">
             <label  className = "me-2" htmlFor='email'>Email</label>
                <input id="email" onChange = {changeEmailText} class = "form-control me-1" value={emailText} />
                
                <button  onClick = {submitEmail} class = "btn btn-primary"> Submit</button>
                
             </div>
             <div className='d-flex form-group'>
               <label htmlFor='newPassword'>Change password</label>
               <input type="password" id = "newPassword" onChange=  {changeNewPasswordText} className=  "form-control" value = {newPasswordText} />
               <button className='btn btn-primary' onClick = {submitPassword}>Submit</button>
               
             </div>
            {option &&  <ConfirmPassword option={option} newValue = {newValue} setError= {setError} setOption= {setOption}/> }
           
             
             <p>{error}</p>
        </div>
        </div>
  
  )
}

export default UserProfile
import React from 'react'
import Navbar from '../components/Navbar'
import {useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from '../context/UserContext'
import userEvent from '@testing-library/user-event'
function ReviewForm() {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  const [formInput,setFormInput] = useState({
      app: "",
      review: ""
  })
  const [error,setError] = useState(null)
  const onSubmit = (e)=>{
      e.preventDefault()
      if(formInput.app.length === 0 || formInput.review.length === 0){
          setError("Neither field can be empty")
      }
    

  }


  const inputChange = (e)=>{
    setFormInput((oldState)=>{
        return {...oldState,[e.target.id]:e.target.value}})
  }
  if(!user){
      return <>
      <Navbar></Navbar><div>You arent logged in</div></>
  }
  return (
    <><Navbar></Navbar>
    <div class="container">
        <form onSubmit={onSubmit} >
            <h5>Review form</h5>
            <label className=' my-1' htmlFor='app'>App Name</label>
            <input onChange={inputChange} value = {formInput.app} id = "app" className="form-control my-1 " type = "text" />
            <label className='my-1' htmlFor='review'>Review</label>
            <textarea onChange = {inputChange} value = {formInput.review} id = "review" className="form-control my-1" type = "text" />
            <button type = "submit" className='mt-1 btn btn-warning'>Submit</button>
        </form>
        {error && <p>{error}</p>}


      </div></>
  )
}

export default ReviewForm
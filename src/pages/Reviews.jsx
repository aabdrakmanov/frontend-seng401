import React from 'react'
import {useState,useEffect,useRef} from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import ReviewForm from './ReviewForm';

function Reviews() {

  const isMounted = useRef(true)
  const [reviewArray,setReviewArray] = useState([])
  const [option,setOption] = useState("all")
  const [appText,setappText] = useState("")
  const [edited,setEdited] = useState(null)
  const [deleted,setDeleted] = useState(null)
  const [editText, setEditText] = useState("")
  const [add,setAdd] = useState(false)
  const changeText = (e)=>{
    setappText(e.target.value)
  }
  const editButton = (e)=>{
    
    setEdited(+e.target.value)
    const r = reviewArray.find(ireview=>{
     return ireview.ID === +e.target.value
    })
    setEditText(r.review)
  }
  const searchApp = async (e)=>{
    setOption("app")
    console.log("called")
    if(e !== undefined){
    e.preventDefault()
    }
    if(appText.length == 0){
      return
    }
    try{
    const response = await axios.get("https://api-401-reviews.herokuapp.com/getReviewApp", {
      params: {
        app : appText
      }
    })
    
    console.log(response.data)
  if(isMounted.current){
  setReviewArray(response.data)
  }
    }
    catch(error){
      console.log(error)
      if(isMounted.current){
      setReviewArray([])
      }
    }
  }
  const getAllReviews = async ()=>{
    try{
    setOption("all")
    const response = await axios.get("https://api-401-reviews.herokuapp.com/getReview")
    console.log(response.data)
    if(isMounted.current){
    setReviewArray(response.data)
    }
    }
    catch(error){
      console.log(error)
      if(isMounted.current){
      setReviewArray([])
      }
    }

  }
  const getPerUser = async ()=>{
    setOption("user")
    try{
    const response = await axios.get("https://api-401-reviews.herokuapp.com/getReviewUser", {
      params: {username:localStorage.getItem("username")}
    })
    if(isMounted.current){
      setReviewArray(response.data)
    }
  }
    catch(error){
      console.log(error)
      if(isMounted.current){
      setReviewArray([])
      }
    }

  }
  const addReview = async ()=>{
    setAdd(oldState=>{
      return !oldState
    })

  }

  const changeEditText= (e)=>{
    setEditText(e.target.value)
    

  }

  const saveEdit = async (e)=>{
    const id = +e.target.value
    try{
  
      await axios.put("https://api-401-reviews.herokuapp.com/editReview", {
          ID:id,
          newReview:editText
        
      })
      let copyArray = reviewArray
      for(let i = 0;i<copyArray.length;i++){
        if(copyArray[i].ID === id){
          copyArray[i].review = editText
        }
      }
      if(isMounted.current){
      setReviewArray(copyArray)
      }
    /*  if(option === "all"){
        getAllReviews()
      }
      else if(option === "user"){
        getPerUser()
      }
      else {
        searchApp()
      } */
      
    }
    catch(error){
      console.log(error)
      window.alert("Something wrong went saving changes")
    }
    if(isMounted.current){
    setEdited(null)
    }

  }

  const deleteReview = async (e)=>{
    let deletedID = +e.target.value
    try{
    await axios.delete("https://api-401-reviews.herokuapp.com/deleteReview", {
      data: {
        ID: deletedID
      }
    })
    const newArray = reviewArray.filter((ireview)=>{
      return ireview.ID !== deletedID
    })
    if(isMounted.current){
    setReviewArray(newArray)
    setDeleted(null)
    }
  }
  catch(error){
    console.log(error)
    window.alert("something went wrong in delete")
  }


  }
  useEffect(()=>{
   
  
    getAllReviews()
    
    return () => { isMounted.current = false }
  },[])
  if(localStorage.getItem("username") === null){
    return <><Navbar/> <div>You arent logged in</div> </>
}
  return (
   <><Navbar /><div className="container mt-2">
     
      
     <div className='d-flex mt-1'>
     <div className='row'>
        <div className='col col-sm-2'>
       <button onClick = {getAllReviews} className=' btn btn-warning mx-1'>All reviews</button>
       </div>
       <div className='col col-sm-2 '>
       <button onClick = {getPerUser} className='btn btn-warning mx-1'>Your reviews</button>
       </div>
       <div className='col col-sm-6'>
       <form className=' mx-1 d-flex' onSubmit={searchApp}>
       <input  onChange = {changeText} value = {appText} class = "form-control me-1" placeHolder  ="app name"></input>
       <button type = "submit" className='btn btn-warning mx-1'>Search</button>
       </form>
       </div>
       <div className='col col-sm-2'>
       <button onClick = {addReview} className='btn btn-warning mx-1'>Add review</button>
       </div>
     
       </div>
     
     </div>
     {add && <ReviewForm option = {option} getAllReviews=  {getAllReviews} getPerUser = {getPerUser} searchApp= {searchApp} setAdd={addReview}/>}
     { reviewArray.length !=0 ? (<table className="table table-dark table-hover mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">App name</th>
            <th scope="col">Username</th>
            <th scope = "col">Review</th>
            
          </tr>
        </thead>
        <tbody>
          { reviewArray.map ((ireview)=>(
              <tr key = {ireview.ID}>
              <th scope="row">{ireview.ID}</th>
              <td>{ireview.app}</td>
              <td>{ireview.username}</td>
             {edited !== ireview.ID ? (<td>{ireview.review}</td>) :
             <td><input onChange = {changeEditText} value = {editText}></input></td>
             
             }
              {(ireview.username === localStorage.getItem("username") && (
                edited !== ireview.ID ? (<td><button value = {ireview.ID} onClick = {editButton}className='btn btn-warning'>Edit Review</button></td>):
                (<td><button value = {ireview.ID} onClick = {saveEdit}className='btn btn-warning'>Save</button></td>)
              )) }
              {ireview.username === localStorage.getItem("username") && <td><button value = {ireview.ID}onClick = {deleteReview} className='btn btn-primary'>Delete Review</button></td>}
              
            </tr>
          ))
          }
         
        </tbody>
      </table>): <div className='mt-2'> No reviews found</div>}
    </div></>
  )
}

export default Reviews
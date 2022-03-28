import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
function AppSearchItem({app}) {
 const [url,setUrl] = useState(`/devResult?company=${app.name}`)
  return (
  
    <Link to = {url}>
    <div class = "mt-4 d-flex" >
       
        <img src = {app.img} style = {{width:`15%`,height:`25%`}}/>
        <div>
            <h6>{app.name}</h6>
           
        </div>
        
    
    </div>
    </Link>
  )
}

export default AppSearchItem
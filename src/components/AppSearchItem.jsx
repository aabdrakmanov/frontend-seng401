import React from 'react'
import {Link} from 'react-router-dom'
function AppSearchItem({app}) {
  return (
    <Link to = "/app/id">
    <div class = "mt-4 d-flex" style = {{width:`10%`,height:`20%`}}>
       
        <img src = "https://o.qoo-img.com/ggpht/59Y11UN03Is138F70z_I_ZN_gc8yPNNUAlh5BKlQVl82Bw07FA30sO9LWWO9Cm8PF7o?w=192"/>
        <div>
            <h6>App name</h6>
            <p>Some info</p>
        </div>
        
    
    </div>
    </Link>
  )
}

export default AppSearchItem
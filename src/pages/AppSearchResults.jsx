import React from 'react'
import AppSearchItem from '../components/AppSearchItem'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
function AppSearchResults() {
    const arr = [1,2,3]
    const {text} = useParams()
  return (
      <><Navbar></Navbar><div class="container">

          <div class="row mt-1">
              <h3>Search results for {text}</h3>
          </div>
          <div class="row">
              <div class="col-md-12">
                  {arr.map((item) => (
                      <AppSearchItem app={item}></AppSearchItem>
                  ))}
              </div>
          </div>
      </div></>
  )
}

export default AppSearchResults
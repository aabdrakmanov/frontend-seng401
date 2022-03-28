
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Loading from './components/Loading';

import {lazy,Suspense} from 'react'
import Loadable  from 'react-loadable';
import {UserProvider} from "./context/UserContext"
function App() {
  const Home = Loadable({
    loader: ()=> import("./pages/Home"),
  loading:Loading
  })

  const About = Loadable({
    loader: ()=> import("./pages/About"),
  loading:Loading
  })

  const Login = Loadable({
    loader: ()=> import("./pages/Login"),
  loading:Loading
  })
  const Signup = Loadable({
    loader: ()=> import("./pages/Signup"),
  loading:Loading
  })
  const AppEntry = Loadable({
    loader: ()=> import("./pages/AppEntry"),
  loading:Loading
  })

  const Reviews = Loadable({
    loader: ()=> import("./pages/Reviews"),
  loading:Loading
  })
  const UserProfile = Loadable({
    loader: ()=> import("./pages/UserProfile"),
  loading:Loading
  })

  const ViewApps = Loadable({
    loader: ()=> import("./pages/ViewApps"),
  loading:Loading
  })

  const AppSearchResults = Loadable({
    loader: ()=> import("./pages/AppSearchResults"),
  loading:Loading
  })
  
  return (
   
    <div className="App">
      <Router>
      <Suspense fallback = {<div>Loading</div>}>
        <UserProvider>
        <Routes>
         
          <Route path = '/' element = {<Home/>} />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/signup' element = {<Signup/>} />
          <Route path="/devResult" element = {<AppEntry/>}/>
          <Route path = "/search/:text" element = {<AppSearchResults/>}/>
          <Route path = "/loggedin" element = {<ViewApps/>} />
          
          <Route path = "/reviews" element = {<Reviews/>}/>
          <Route path = "/profile" element = {<UserProfile/>}/>
          
        </Routes>
        </UserProvider>
        </Suspense>
   
      </Router>
    </div>
  
  );
}

export default App;

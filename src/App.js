
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup'
import { UserProvider } from './context/UserContext';
import AppEntry from './pages/AppEntry';
import AppSearchResults from './pages/AppSearchResults';
import ViewApps from './pages/ViewApps';
function App() {
  return (
    <UserProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/signup' element = {<Signup/>} />
          <Route path="/devResult" element = {<AppEntry/>}/>
          <Route path = "/search/:text" element = {<AppSearchResults/>}/>
          <Route path = "/loggedin" element = {<ViewApps/>} />
        </Routes>
   
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;

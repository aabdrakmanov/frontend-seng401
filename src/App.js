
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup'
import { UserProvider } from './context/UserContext';
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
        </Routes>
   
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;

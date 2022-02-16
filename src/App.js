
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
        </Routes>
   
      </Router>
    </div>
  );
}

export default App;

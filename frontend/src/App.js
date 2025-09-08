import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import './App.css';
import Signup from "./components/Signup";


function App() {
    
  let url = "https://to-do-list-backend-2jt1.onrender.com"

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup"/>} />
        <Route path="/Home" element={<Home url={url}/>} />
        <Route path="/Login" element={<Login url={url}/>} />
        <Route path="/Signup" element={<Signup url={url}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import './App.css';
import Signup from "./components/Signup";


function App() {
    

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup"/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    let [username,setUsername] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("")

    let navigate = useNavigate();

     let handler = async(e)=>{
      e.preventDefault()
     try{
      let req = await fetch("https://to-do-list-backend-2jt1.onrender.com/user/signup",
        {method:"post",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password})}
    )
      let res = await req.json()
      
      if(req.ok){
        navigate("/Home",{state:{username}})
      }else{
        alert(res.message)
      }

     }catch(error){
        alert(error)
     }

    }
  return (
    <>
      <div className='Signup'>    
          <div className='main'>
              <form onSubmit={(e)=>{handler(e)}}>
                 <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username'></input>
                 <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='E-mail'></input>
                 <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
                 <button>Signup</button>
              </form>
              <div className='Login'>
                      <p>If you already have account</p>
                      <Link to='/Login'>Login</Link>
              </div>
          </div>
      </div>
    </>
  )
}

export default Signup

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'

const Login = ({url}) => {

   const [username,setUsername] = useState("")
   const [password,setPassword] = useState("")

   let navigate = useNavigate()

    let handler = async(e)=>{
      e.preventDefault()
      try{
          let req = await fetch(`${url}/user/Login`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})})

          let data = await req.json()
          

           if(req.ok){
             localStorage.setItem("token", data.token);
             navigate("/Home",{state:{username}})
           }else{
            alert(data.massage||"login failed")
           }
      }catch(error){
            alert(error)
      }
      
    }
  return (
    <>
      <div className='login'>
          <div className='main'>
             <div className='welcome'>
              <h1>Welcome <br></br> to</h1>
              <img src='/favicon.ico'></img>
            </div>
              <form onSubmit={(e)=>{handler(e)}}>
                 <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='Username'></input>
                 <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password'></input>
                 <button>Login</button>
              </form>
              <div className='signup-page'>
                      <p>If you did't have an Account</p>
                      <Link className='link' to="/Signup">Signup</Link>
              </div>
          </div>
      </div>
    </>
  )
}

export default Login

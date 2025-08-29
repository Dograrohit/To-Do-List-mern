import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({url}) => {

   const [username,setUsername] = useState("")
   const [password,setPassword] = useState("")

   let navigate = useNavigate()

    let handler = async(e)=>{
      e.preventDefault()
      try{
          let req = await fetch(,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})})

          let data = await req.json()
          

           if(req.ok){
             navigate("/Home",{state:{username}})
           }else{
            alert(data.massage)
           }
      }catch(error){
            alert(error)
      }
      
    }
  return (
    <>
      <div className='login'>
          <div className='main'>
              <form onSubmit={(e)=>{handler(e)}}>
                 <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='Username'></input>
                 <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password'></input>
                 <button>Login</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default Login

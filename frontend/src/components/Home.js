import React, { useEffect, useState } from 'react'
import '../App.css';
import { data, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Home = ({url}) => {
const location = useLocation()
const {username} = location.state||{}
const [text,setText] = useState("")
const [note,setNote] = useState([])
const navigate = useNavigate()

const token = localStorage.getItem("token")

//submit and list update

let submithandler = async(e)=>{
  e.preventDefault()
  try{
        let req = await fetch(`${url}/Home`,{method:"post",headers:{"Content-type":"application/json", "Authorization": `Bearer ${token}`},credentials: "include",body:JSON.stringify({text})})
 
        if (req.status === 401) {
        localStorage.removeItem("token");
        navigate("/Login");
        return;
      }

        setText("")
        fetchData()
  }catch(error){
      alert(error)
  }
}

//toggle check

let toggle = async(id,newcheck,idx)=>{
  try{
  let req = await fetch(`${url}/Home/${id}`,{method:"PUT",headers:{"Content-Type":"application/json",credentials: "include", "Authorization": `Bearer ${token}`},
  body:JSON.stringify({id,check:newcheck})
})

if (req.status === 401) {
        localStorage.removeItem("token");
        navigate("/Login");
        return;
      }

const update = [...note]
update[idx].check = newcheck;
setNote(update)
  }catch(error){
  alert(error)
  }
}

//fetch data

const fetchData = async () => {
    try {
      let res = await fetch(`${url}/Home`,{headers:{ "Authorization": `Bearer ${token}`},credentials: "include",});
 
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/Login");
        return;
      }

      let data = await res.json();
       setNote(data.list || [])
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  //for delete note

  const deletenote = async(id)=>{
      try{
        let req = await fetch(`${url}/Home/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}` },credentials: "include",
    });

    if (req.status === 401) {
        localStorage.removeItem("token");
        navigate("/Login");
        return;
      }

      fetchData()
        
      }catch(error){
        alert(error)
      }
  }

useEffect(()=>{

  if (!token) {
      navigate("/Login"); 
    }
  
  fetchData()
    
},[navigate,token])


  return (
    <>
      <nav>
          <div className='logo'><img src='mylogo.png'></img></div>
          <div className='name'><h1>{username.toUpperCase()}</h1></div>

          <form onSubmit={(e)=>{submithandler(e)}}>
              <input value={text} onChange={(e)=>setText(e.target.value)} type='text' placeholder='Add Your List'></input>
              <button>ADD</button>
          </form>
      </nav>

      <main>

        {note.length > 0 ? (
          note.map((value, i) => (
            <div key={value._id} className='list'>
              <label className='checkbox'>
                <input
                  type='checkbox'
                  checked={value.check}
                  onChange={() => toggle(value._id, !value.check, i)}
                />
                <span className='checkmark'></span>
              </label>

              <div className='note'>{value.massage}</div>

              <span className='delete' onClick={() => deletenote(value._id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
         

      </main>
    </>
  )
}

export default Home

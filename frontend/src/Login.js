import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import "./Login.css"
import axios from 'axios'
const Login = () => {
  const [email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
const [result,setResult]=useState([])

  const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
    const result =await axios.post("http://localhost:3019/api/Login",{email:email,password:Password})
    if(result.status==200){
      setResult(result.data);
     
    }
    else{
      alert ("Something wrong");
    }
    }
    catch(err){
alert("Unable to Login");

    }
  }

  return (
    <div>
    <div className='frontTopBar'>
    <Link to="/Profile" className="links">Profile</Link>
        <Link to="/Register" className="links">Register</Link>
        <Link to="/Shop" className="links">Shop</Link>
        <Link to="/Cart" className="links">Cart</Link>
        <Link to="/AddProducts" className='links'>AddProducts</Link>
        <Link to="/Logout" className='links'>Logout</Link>
    </div>

        <div>
          <form className='loginForm' onSubmit={(e)=>{handleLogin(e)}}>
          <label className='loglabel'>Email</label><br/>
          <input type="text" placeholder="Enter email" className='logBox' onChange={(e)=>{setEmail(e.target.value)}}/><br/>
          <label className='loglabel'>Password</label><br/>
          <input type="password" placeholder='Enter your password' className='logBox' onChange={(e)=>{setPassword(e.target.value)}} /> <br/>
          <button type="submit" className='logbutt'>Login</button>
          <button className='logbutt'><Link to="/Register" className='loglinks'>Register</Link></button>
          </form> 
          
        </div>
        
          {result.map((value)=>{
           localStorage.setItem("user_id",value._id)
           navigate("/Shop")
          })}
      
    </div>
  )
  
}

export default Login
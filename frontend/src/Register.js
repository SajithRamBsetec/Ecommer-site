import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {DatePicker} from "antd"
import "./Register.css"

const Register = () => {
  //Register Values
  const [name,setName]=useState("")
  const [email,setemail]=useState("")
  const [ReMail,setReMail]=useState("")
  const [date,setDate]=useState("")
  const [Password,setPassword]=useState("")
  const [rePassword,setRePassword]=useState("")
const [file,setFile]=useState()
  //Error Variables
  const [error, setError] = useState({});

  //Error handling
const errorHandling=()=>{
  var errors={}
  if(name==""){
    errors.name="Namefield should not be empty"
  }
  else{
    if(name==/^[a-zA-Z\s]+$/){
     errors.name="Invalid name"
    }
  }
  if(email==""){
  errors.email="email is empty"
  }
  else{
    if(email==/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/){
      errors.email="Email is invalid"
    }
  }
  if(Password==""){
    errors.pass="Password is empty"
  }
  else{
    if(Password==/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/){
      errors.pass="pass word must contain a Uppercase,Lowercase,Number,SpecialCharacter and greatere the n6 in length"
    }
  }
  if(date==""){
    errors.date="Date feild is empty"
  }
  if(email!==ReMail){
    errors.remail="Mail is not matching"

  }
  if(Password!==rePassword){
    errors.repass="Password is not matching"
  }
  setError(errors);
  return Object.keys(errors).length === 0;
}

  //post submission of form
  const handlesubmit=async(e)=>{
    
    e.preventDefault()
    const form=new FormData();
    form.append("name",name)
    form.append("email",email)
    form.append("date",date)
    form.append("password",Password)
    form.append("file",file)
    const err=errorHandling()
    if(err){
      
try{
    const result=await axios.post("http://localhost:3019/api/Register",form)
    if(result.status==200){
      alert("Registeration sucessfull")
    }
    else{
      alert ("something went wrong in bi uploading")
    }
}
catch{
  alert ("something went wrong in uploading")
} 
    }
    
    
  }
  const datesetting=(date,dateString)=>{
    setDate(dateString);
  }
  return (
    <div>
    <div className='frontTopBar'>
    <Link to="/Profile" className="links">Profile</Link>
        <Link to="/Shop" className="links">Shop</Link>
        <Link to="/Cart" className="links">Cart</Link>
        <Link to="/AddProducts" className='links'>AddProducts</Link>
        <Link to="/Logout" className='links'>Logout</Link>
      <span className='loginIndicator'>Click Here to</span> <Link to="/Login" className='LoginLink'>Login</Link>
    </div>
        <div className='Container'>
        <h1 className='RegisterHeading'>Register</h1>
            <form className='RegisterForm' onSubmit={(e)=>{handlesubmit(e)}}>
            <div className='row'>
            <div className='col-6'>
            <label className='reglabel'>Name</label><br/>
                <input type="text" placeholder='Enter your name' onChange={(e)=>{setName(e.target.value)}} className='RegisterBox'/><br/>
                {error.name&&<span className='regSpan'>{error.name}</span>}
               <br/> <label  className='reglabel'>Email</label><br/>
                <input type="text" placeholder='Enter your email' onChange={(e)=>{setemail(e.target.value)}} className='RegisterBox'/><br/>
                {error.email&&<span className='regSpan'>{error.email}</span>}
                <br/><label  className='reglabel'>Password</label><br/>
                <input type= "password" placeholder='Enter a Password' onChange={(e)=>{setPassword(e.target.value)}} className='RegisterBox'/><br/>
                {error.pass&&<span className='regSpan'>{error.pass}</span>}
                <label className='reglabel'>upload Photo</label><br/>
         <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} className='RegisterBox'/>
                </div>
                <div className='col-6'>
                <label  className='reglabel' >Dob</label><br/>
                <DatePicker className='RegisterBox' onChange={(date,dateString)=>{datesetting(date,dateString)}}/><br/>
                {error.date&&<span className='regSpan'>{error.date}</span>}
               
                <br/> <label  className='reglabel' >Confirm Email</label><br/>
                <input type="text" placeholder='ReEnter email' onChange={(e)=>{setReMail(e.target.value)}} className='RegisterBox'/><br/>
                {error.remail&&<span className='regSpan'>{error.remail}</span>}
                <br/><label  className='reglabel'>Confirm Password</label><br/>
                <input type="password" placeholder="ReEnter Password" onChange={(e)=>{setRePassword(e.target.value)}} className='RegisterBox'/><br/>
                {error.repass&&<span className='regSpan'>{error.repass}</span>}
                </div>
                <div>
                <button className='RegisterSubmit'>Submit</button>
                </div>
              
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
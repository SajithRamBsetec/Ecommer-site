import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Profile.css"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
const navigate=useNavigate()
    const [profile,setProfile]=useState([])

    useEffect(()=>{
      const user=localStorage.getItem("user_id")
axios.post("http://localhost:3019/api/Profile",{
userId:user,
}).then((res)=>{
setProfile(res.data)})
    },[])
  return (
    <div>
      <div>
    {profile?(
<div>
      <div className='profileBox'>
      <div className='profile_photo'>
      <img src={`http://localhost:3019/${profile.File}`} id="profileImage" />
      </div>
       <label>Name : </label>
  <>{profile.Name}</><br/>
  <label>Email : </label>
  <>{profile.Email}</><br/>
  <label>Date Of Birth : </label>
  <>{profile.DateOfBirth}</>
 
  </div>
  
  </div>):(<></>)}
      </div>
      <button onClick={()=>navigate(-1)} className='ProfileBackButt'>Back</button>
      </div>
  )
}

export default Profile
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        const logout=window.confirm("Do you want to logout")
        if(logout){
            localStorage.clear()
    navigate("/Login")
        }
        else{
          navigate(-1)
        }
    })
  return (
    <div>Logout</div>
  )
}

export default Logout
import React, { useState } from 'react'
import "./HotNews.css"
import axios from 'axios'

const HotNews = () => {
//initializations
const [newsInfo,setNewsInfo]=useState("")
const [file,setFile]=useState("")
const [identify,setIdentify]=useState("")


const addHotNews=async()=>{
    let form=new FormData()
    form.append("newsInfo",newsInfo)
    form.append("file",file)
    form.append("identification",identify)

const result=await axios.post("http://localhost:3019/api/addHotNews",form)
if(result.status==200){
    alert("sucessfully uploaded")
}
else{
    alert("something went wrong")
}
}


  return (
    <div>
        <h2 className='hotNewsHeading'>Add Hot News</h2>
      <div className='hotNewsUpload'>
        <form>
        <label className='hotNewsLabel'>News Info</label><br/>
        <input type="text" placeholder='news info' className='hotNewsInputs' onChange={(e)=>{setNewsInfo(e.target.value)}} /><br/>
        <label  className='hotNewsLabel'>Image of News</label><br/>
        <input type="file" className='hotNewsInputs' onChange={(e)=>{setFile(e.target.files[0])}}/><br/>
        <label className='hotNewsLabel'>Re-direction</label> <span style={{color:"red"}}>* Provide unique details like Tags</span><br/>
        <input type="text" placeholder="redirection if any" className='hotNewsInputs' onChange={(e)=>{setIdentify(e.target.value)}}/><br/>
        <button type="submit" className='hotNewsButton' onClick={()=>{addHotNews()}}>Submit</button>

        </form>
        
      </div>
    </div>
  )
}

export default HotNews

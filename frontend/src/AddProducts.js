import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./AddProduct.css"
import TextArea from 'antd/es/input/TextArea'
const AddProducts = () => {
  const [category,setCategory]=useState("")
  const [prevtags,setPrevTags]=useState("")
  const [Tags,setTags]=useState([])
  const [file,setFile]=useState("")
  const [files,setFiles]=useState([])
  const [price,setPrice]=useState("")
  const [description,setDescription]=useState("")
  const [prevSpecs,setPrevSpecs]=useState("")
  const [Specifications,setSpecifications]=useState([])

  //handle product submission
  const handleProduct=async(e)=>{
    e.preventDefault();
    const form=new FormData();
    form.append("category",category)
    form.append("Tags",JSON.stringify(Tags))
form.append("files",file)
    form.append("price",price)
    form.append("description",description)
    form.append("Specifications",JSON.stringify(Specifications))
    for (let i = 0; i < files.length; i++) {
      form.append("files", files[i]);
  }
  
  
    try{
    const result =await axios.post("http://localhost:3019/api/addProduct",form)
    console.log(result)
    if(result.status==201){
      alert("product added Sucessfully");
    }
    else{
      console.log(result)
      alert("Something went wrong")
    }
  }
  catch(err){
alert("unable to add Product")
  }
  }
  useEffect(()=>{
    if(prevtags){
      const tagArray=prevtags.split(/[,;]+/).map((values)=>values.trim())
      setTags(tagArray);
    }
  },[prevtags])
  useEffect(()=>{
    if(prevSpecs){
      const specsArray=prevSpecs.split(/[,;]+/).map((values)=>values.trim())
      setSpecifications(specsArray);
    }
  },[prevSpecs])
  return (
    <div>
  <div>new testing</div>
       <div>
       <form className='productform' onSubmit={(e)=>{handleProduct(e)}}>
       <h3 style={{textAlign:"center"}}>Product Details</h3>
       <br/><label className='productlabel'>Category</label>
        <br/><input type="text" placeholder="Specify Category" className='productBox' onChange={(e)=>{setCategory(e.target.value)}} />
       <br/><label className='productlabel'>Price</label>
        <br/><input type="number" placeholder="Product price" className='productBox' onChange={(e)=>{setPrice(e.target.value)}}/>
        <br/><label className='productlabel'>Description</label>
        <br/><input type="text" placeholder="Product Description ..." className="productBox" onChange={(e)=>{setDescription(e.target.value)}} />
        <br/><label className='productlabel'>Tags </label>
        <span style={{color:"red",marginLeft:"10px"}}> *Using comma "," or semicolan ";" will seperate the Tags</span>
        <br/><input type="text" placeholder="Enter tags" className="productBox" onChange={(e)=>{setPrevTags(e.target.value)}} />
        <br/><label className='productlabel'>Cover Image</label>
        <br/><input type="file"   className='productBox' onChange={(e)=>{setFile(e.target.files[0])}}/>
        <br/><label className='productlabel'>Spec Image</label>
        <br/><input type="file"  multiple className='productBox' onChange={(e)=>{setFiles(e.target.files)}}/>
        <br/><label className='productlabel'>Specifications </label>
        <span style={{color:"red",marginLeft:"10px"}}> *Using comma "," or semicolan ";" will seperate the Tags</span>
        <br/><TextArea placeholder="Enter tags" className="productBox" onChange={(e)=>{setPrevSpecs(e.target.value)}} />
       <br/><button type="submit" className='productbutt'>Submit</button>
       </form>
       </div> 
 
    </div>
  )
}

export default AddProducts
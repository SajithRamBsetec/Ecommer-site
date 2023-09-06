import React, { useState,times, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Select from 'react-select';
import axios from "axios"
import "./AddProduct.css"


const NewAddProductPage = () => {
  const [option, setOption] = useState([ 
{value:'zzz',label:'AddCategory'}]);
  const [VarietyOption, setVarietyOption] = useState([
    {value:'zzz',label:'AddVariety'}]);
  const [BrandOption, setBrandOption] = useState([ 
  {value:'zzz',label:'AddBrand'}]);
  const [enteredValue, setEnteredValue] = useState("");
  const [Category, setCategory] = useState("");
  const [Variety, setVariety] = useState("");
  const [Brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [Tags, setTags] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [inputField,setInputField]=useState(0)
const [SpecKey,setSpecKey]=useState("")
const [SpecValue,setSpecValue]=useState("")
const [Specifications, setSpecifications] = useState([]);
const [CategoryData,setCategoryData]=useState([])
const [SpecificationKeys,setSpecificationKeys]=useState([])
const specValueState = useState([]); 

useEffect(() => {
  axios.get('http://localhost:3019/api/getCategoryData')
    .then((result) => {
      const categoryData = result.data;
      setCategoryData(result.data);

      const newOptions = categoryData.map((item) => ({
        value: item.Category,
        label: item.Category,
      }));

      newOptions.unshift({ value: 'zzz', label: 'AddCategory' });
      setOption(newOptions);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, []);

useEffect(() => {
  // Update Variety and Brand options based on the selected Category
  if (Category && Category.value !== 'zzz') {
    const selectedCategoryData = CategoryData.find(
      (item) => item.Category === Category.value
    );

    if (selectedCategoryData) {
      const newVarietyOption = selectedCategoryData.Variety.map((variety) => ({
        value: variety,
        label: variety,
      }));

      const newBrandOption = selectedCategoryData.Brand.map((brand) => ({
        value: brand,
        label: brand,
      }));
      const newSpecification=selectedCategoryData.SpecificationKeys.map((specs)=>specs)

      newVarietyOption.unshift({ value: 'zzz', label: 'AddVariety' });
      newBrandOption.unshift({ value: 'zzz', label: 'AddBrand' });
setSpecificationKeys(newSpecification)
      setVarietyOption(newVarietyOption);
      setBrandOption(newBrandOption);
    }
  } else {
    // If 'AddCategory' is selected or Category is not selected, reset Variety and Brand options
    setVarietyOption([{ value: 'zzz', label: 'AddVariety' }]);
    setBrandOption([{ value: 'zzz', label: 'AddBrand' }]);
  }
}, [Category, CategoryData]);




  const handleCategory = (enteredValue) => {
    setOption([...option, {value:enteredValue,label:enteredValue}]);

    axios.post("http://localhost:3019/api/AddProductFilters",{
      Data:enteredValue,
      Adding:"Category"
  })
    .then((result)=>alert("Category saved sucessfully"))

    setEnteredValue("");
  };

  const handleVariety = (enteredValue) => {
    setVarietyOption([...VarietyOption, {value:enteredValue,label:enteredValue}]);

    axios.post("http://localhost:3019/api/AddProductFilters",{
      Category:Category,
      Data:enteredValue,
      Adding:"Variety"
  })
    .then((result)=>alert("Variety saved sucessfully")).catch((err)=>{"exists"})

    setEnteredValue("");
  };

  const handleBrand = (enteredValue) => {
    setBrandOption([...BrandOption, {value:enteredValue,label:enteredValue}]);

    axios.post("http://localhost:3019/api/AddProductFilters",{
      Category:Category,
      Data:enteredValue,
      Adding:"Brand"
  })
    .then((result)=>alert("Brand saved sucessfully")).catch((err)=>{alert("Category already exist")})

    setEnteredValue("");
  };

  const handleTags = (tag) => {
    // Check if the tag is not empty
    if (tag.text.trim() !== "") {
      setTags([...Tags, tag]);
    }
  };
  
  const handleTagDelete = (i) => {
    const newTags = [...Tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const addInputField=(e)=>{
e.preventDefault()
    setInputField(inputField+1)
  }
  

  const addSpecification=(e)=>{
    e.preventDefault();
  const newSpec = { Key: SpecKey, Value: SpecValue };
  setSpecifications((prevSpecs) => [...prevSpecs, newSpec]);
  axios.post("http://localhost:3019/api/AddProductFilters",{
    Category:Category,
    Data:SpecKey,
    Adding:"Specification"
})
  .then((result)=>alert("Category saved sucessfully"))
  setSpecKey("");
  setSpecValue("");

    
  }
// useEffect(()=>{
//   axios.get("http://localhost:3019/api/getCategoryData").then((result)=>{
//     setCategoryData(result.data)
//   })
// })

  useEffect(()=>{
    const sortedOption=[...option].sort((a,b)=>a.value.localeCompare(b.value))
    const sortedVarietyOption=[...VarietyOption].sort((a,b)=>a.value.localeCompare(b.value))
    const sortedBrandOption=[...BrandOption].sort((a,b)=>a.value.localeCompare(b.value))
    setOption(sortedOption)
    setVarietyOption(sortedVarietyOption)
    setBrandOption(sortedBrandOption)
  },[])


  const handleProduct=async(e)=>{
    e.preventDefault();
    const form=new FormData();
    form.append("category",Category.value)
    form.append("variety",Variety.value)
    form.append("brand",Brand.value)
    form.append("productName",productName)
    form.append("price",Price)
    form.append("description",Description)
    form.append("Tags",JSON.stringify(Tags))
    form.append("specifications",JSON.stringify(Specifications))
    form.append("files",file)
   

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
  console.log(Specifications)
  return (
    <div>
      
      <div>
        <form className="productform" onSubmit={(e)=>{handleProduct(e)}}>
          {Category.value !== "zzz" ? (
            <>
              <label className='productlabel'>Category</label><br />
              <Select
              value={Category}
              options={option}
              isSearchable={true}
               onChange={(e) => { setCategory(e);}} />

              <br />
            </>
          ) : (
            <>
              <label className='productlabel'>Add Category</label><br />
              <input
                type="text"
                value={enteredValue}
                onChange={(e) => setEnteredValue(e.target.value)}
              />
              <button onClick={() => { handleCategory(enteredValue); setCategory("") }}>
                Add Category
              </button> 
              <button onClick={()=>{setCategory("") }}>Cancel</button>
              <br />
            </>
          )}

          {Variety.value !== "zzz" ? (
            <>
              <label className='productlabel'>Variety</label><br />
              <Select
              options={VarietyOption}
              value={Variety}
               onChange={(e) => { setVariety(e) }}
              isSearchable={true}   
              />       
              <br />
            </>
          ) : (
            <>
              <label className='productlabel'>Add Variety</label><br />
              <input
                type="text"
                value={enteredValue}
                onChange={(e) => setEnteredValue(e.target.value)}
              />
              <button onClick={() => { handleVariety(enteredValue); setVariety("") }}>
                Add Variety
              </button>
              <button onClick={()=>{setVariety("") }}>Cancel</button>
              <br />
            </>
          )}

          {Brand.value !== "zzz" ? (
            <>
              <label className='productlabel'>Brand</label><br />
              <Select 
              options={BrandOption}
              onChange={(e) => { setBrand(e) }}
              value={Brand}

              />
            
              <br />
            </>
          ) : (
            <>
              <label className='productlabel'>Add Brand</label><br />
              <input
                type="text"
                value={enteredValue}
                onChange={(e) => setEnteredValue(e.target.value)}
              />
              <button onClick={() => { handleBrand(enteredValue); setBrand("") }}>
                Add Brand
              </button>
              <button onClick={()=>{setBrand("") }}>Cancel</button>
              <br />
            </>
          )}

          <label className='productlabel'>Product Name</label>   <br />
          <input type="text" className='productBox' onChange={(e) => setProductName(e.target.value)} /><br />

          <label className='productlabel'>Product Price</label>   <br />
          <input type="number" className='productBox' onChange={(e) => setPrice(e.target.value)} /><br />

          <label className='productlabel'>Product Description</label>   <br />
          <input type="text" className='productBox' onChange={(e) => setDescription(e.target.value)} /><br />
          
          <label className='productlabel'>Tags</label>   <br />
          <ReactTags
            tags={Tags}
            handleAddition={(tag) => {
             handleTags(tag);
                }}
              handleDelete={handleTagDelete}
  
                />


  
         

             <label className='productlabel'>Cover Image</label>   <br />
                <input type="file"   className='productBox' onChange={(e)=>{setFile(e.target.files[0])}}/><br/>
        
            <label className='productlabel'>Spec Image</label>   <br />
            <input type="file"  multiple className='productBox' onChange={(e)=>{setFiles(e.target.files)}}/><br/>

            <label className='productlabel'>Specification</label>   <br />
            
            {SpecificationKeys.map((item, index) => (
    <div key={index}>
<input className="ProductSpecificationInput"  value={item} type="text" />
 <span> : </span>
 <input className="ProductSpecificationInput" onClick={()=>setSpecKey(item)} onChange={(e)=>setSpecValue(e.target.value)} type="text" />
   <button onClick={(e)=>{setSpecKey(item);addSpecification(e)}}>Ok</button>
    </div>
  ))}


  {Array.from({length:inputField}).map((_,index)=>{
    return(

      
<div key={index}>
 <input className="ProductSpecificationInput"  onChange={(e)=>setSpecKey(e.target.value)}  type="text" />
 <span> : </span>
 <input className="ProductSpecificationInput" onChange={(e)=>setSpecValue(e.target.value)} type="text" />
   <button onClick={(e)=>{addSpecification(e)}}>Ok</button>
 </div>
        
    
 
 )

       })}
   <br/><button onClick={(e)=>{
    addInputField(e);
  }}>Add more Specification</button>


          <br/> <button className='productbutt'>Add</button> 
         
          </form>
        </div>
          


      </div>
    );
  };
  
  export default NewAddProductPage;
  

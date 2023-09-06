import react, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import {Link} from "react-router-dom"
import axios from "axios"
import "./CategoryProductListing.css"
const CategoryProductListing=()=>{
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const categoryName=queryParams.get("categoryName")

//initialization
const [productList,setProductList]=useState([])
const [detailView,setDetailView]=useState(0)
const [imgId, setImgId] = useState("");
const [quantity, setQuantity] = useState(1);
const [userId, setUserId] = useState("");
const [Category, setCategory] = useState(categoryName);
const [CategoryData,setCategoryData]=useState([])
const [SpecificationKeys,setSpecificationKeys]=useState([])
const [option, setOption] = useState([]);
    const [VarietyOption, setVarietyOption] = useState([]);
    const [BrandOption, setBrandOption] = useState([]);
    const [specificationfilter,setSpecificationFilter]=useState([])
const [filterStatus,setFilterStatus]=useState([])


  useEffect(() => {
    axios.get('http://localhost:3019/api/getCategoryData')
      .then((result) => {
        const categoryData = result.data;
        setCategoryData(result.data);
  
        const newOptions = categoryData.map((item) => (item.Category
      ));
  
        setOption(newOptions);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  useEffect(() => {
    // Update Variety and Brand options based on the selected Category
    if (categoryName) {
      const selectedCategoryData = CategoryData.find(
        (item) => item.Category === categoryName
      );
  
      if (selectedCategoryData) {
        const newVarietyOption = selectedCategoryData.Variety.map((variety) => (variety
));
  
        const newBrandOption = selectedCategoryData.Brand.map((brand) => (
     brand
        ));
        const newSpecification=selectedCategoryData.SpecificationKeys.map((specs)=>specs)

var specvalues=[]
if (productList && categoryName) {
  productList.forEach((item) => {
      if (item.Category === categoryName) {
        item.Specifications.forEach((spec) => {
          if (spec && spec.Value) {
            var speckey=spec.Key
            var specvalue=spec.Value
            specvalues.push({Key:speckey,Value:specvalue})
          }
        });
      }
    
  });
  setSpecificationFilter(specvalues)
} else {
  // Handle cases where the required data is not available
  console.error("Data is missing or undefined.");
}

  setSpecificationKeys(newSpecification)
        setVarietyOption(newVarietyOption);
        setBrandOption(newBrandOption);
      }
    } else {
      // If 'AddCategory' is selected or Category is not selected, reset Variety and Brand options
      setVarietyOption([]);
      setBrandOption([]);
    }
  }, [categoryName, CategoryData]);
  

const addCart=(imageId)=>{
    axios.post("http://localhost:3019/api/addcart", {
      userId: userId,
      productId: imageId,
      quantity: quantity,
      mode: "add"
    })
    .then((response) => {
      alert(response.data);
      setQuantity(1) // Display the response data
    })
    .catch((err) => {
      alert("Unable to send");
    });
}

  useEffect(() => {
    let ans = localStorage.getItem("user_id");
    setUserId(ans);
  }, []);


    useEffect(async()=>{
const result=await axios.get("http://localhost:3019/api/CategoryProductList",{
    params:{
        Category:categoryName,
}})
if(result.status==200){

setProductList(result.data)
}
else{
    alert("something is wrong")
}
    },[])

    const handleFilterSelects = (item,Type) => {
      // Check if the item is already in filterStatus
      const itemIndex = filterStatus.findIndex((statusItem) => statusItem.Item === item);
    
      if (itemIndex !== -1) {
        // Item is found, so toggle its Status
        const updatedFilterStatus = [...filterStatus];
        updatedFilterStatus[itemIndex].Status = !updatedFilterStatus[itemIndex].Status;
        setFilterStatus(updatedFilterStatus);
      } else {
        // Item is not found, so add it with Status set to true
        setFilterStatus([...filterStatus, { Item: item, Status: true,Type:Type}]);
      }
    };
    
console.log(filterStatus)


const FilterApplication=()=>{
  var FilterData=[]
  filterStatus.map((item)=>{
if(item.Status==true){
  FilterData.push(item.Item)
}
  })

  //settng to localstorage
  localStorage.setItem("filterOptions",filterStatus)
const filterproducts=productList.filter()
  
}




//JSX
return(
    <div>
  <div className='Category-Product-container' >
      <div className='row'>
          <div className="col-4 ">
<div className="FilterSection">
<br/><h2>Varieties</h2>
{VarietyOption.map((item)=>{
  if(item!==""){
const variety="Variety"
    return(
      <>
          <input type="checkbox" onChange={()=>{handleFilterSelects(item,variety)}} className="filterCheckbox"/>
          <span className="filterName">{item}</span><br/>
          </>
  
    )
    }
  
})}


<br/><h2>Brands</h2>
{BrandOption.map((item)=>{
   if(item!==""){
    const brand="Brand"
    return(
      <>
          <input type="checkbox" onChange={()=>{handleFilterSelects(item,brand)}}  className="filterCheckbox"/>
          <span className="filterName">{item}</span><br/>
          </>
  
    )
    }
  
})}

{console.log(specificationfilter)}
<br/><h2>Specifications</h2>
{SpecificationKeys.map((item)=>{

      return(
        <>
           <h4>{item}</h4>
           
           { specificationfilter.map((result)=>{
              if(result.Key==item){
                const Specs="Specification"
                return(
                  <>
                  <input type="checkbox" onChange={()=>{handleFilterSelects(result.Value,Specs)}}  className="filterCheckbox"/>
                  <span  className="filterName">{result.Value}</span><br/>
                  </>
                )
              }
            })
          }
         </>
            
    
      )
      }    
  )
 
    }
    <button className="ApplyFiltersButt" onClick={()=>{FilterApplication()}}>Apply filters</button>

</div>
          </div>
          <div className="col-8">
          <div className="row">
        {productList.map((product) => (
          <div className='col-sm-6 col-lg-4 ' id="ProductBox">
          
            <div className='cover' onClick={()=>{
              setDetailView(1)
              setImgId(product._id)
            }}>
             
              <div className='ProductBody'>
                <div >
                <Link to={"/ProductDetail/?ProductId="+product._id} className='ProductLink'>
                  <img src={`http://localhost:3019/${product.Image}`} id="CategoryProductImgView" />
                  </Link>
                </div>
                <div className='ProductName'>
                {product.ProductName}
              </div>
                <div className="ProductAmount">Rs.{product.Price}.00</div>
                
                <div className="AddCartButtContainer">
                  <button onClick={()=>{
                  addCart(product._id)}} className="AddCartButton">Add to cart</button>
                  <input
                    type="number"
                    min={1}
                    className='ProductQuantity'
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setImgId(product._id);
                    }}
                  />
                 
               
                </div>
              </div>
            
            </div>
          </div>
      
        ))}
        </div>
        </div>
      </div>
     
    </div>
    </div>
)
                  }
export default CategoryProductListing
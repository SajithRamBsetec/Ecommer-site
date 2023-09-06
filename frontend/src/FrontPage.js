import React, { useEffect, useState } from 'react'
import "./FrontPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping,faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';



const FrontPage = () => {
const [hotOffers,setHotOffers]=useState([])
const [categoryBunch,setCategoryBunch]=useState([])
const [getImage, setGetImage] = useState([]);
const [shopSearch, setShopSearch] = useState("");
const [imgId, setImgId] = useState("");
const [quantity, setQuantity] = useState(1);
const [userId, setUserId] = useState("");



  

useEffect(() => {
  if (shopSearch === "") {
    axios.get("http://localhost:3019/api/getImage", {
      params: {
        imgsearch: null,
        mode: "all"
      }
    })
    .then((result) => {
      setGetImage(result.data);
    })
    .catch((err) => {
      alert("Error occurred while fetching images");
    });
  }
}, [shopSearch]);

const productSearching = async () => {
  try {
    const result = await axios.get("http://localhost:3019/api/getImage", {
      params: {
        imgsearch: shopSearch,
        mode: "search"
      }
    });

    setGetImage(result.data);
  } catch (error) {
    console.error("Error searching products:", error);
    alert("An error occurred while searching products.");
  }
};

const addCart = (imageId) => {
    
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
};

useEffect(() => {
  let ans = localStorage.getItem("user_id");
  setUserId(ans);
}, []);


 useEffect(async()=>{
const result=await axios.get("http://localhost:3019/api/getCategoryBunch")
console.log(result)
if(result.status==200){

setCategoryBunch(result.data)
}
else{
  alert("something is wrong in Category bunching")
}
 },[])
useEffect(async()=>{
  const result=await axios.get("http://localhost:3019/api/getOffers")
  if(result.status==200){
    console.log(result.data)
    setHotOffers(result.data)
  }
  else{
    alert ("something wrong in carousel")
  }

},[])

  return (
    <div>
    
    <div className='frontTopBar'>
    <leftTop>
    <Link className='languageChanger'><select>
    <option>USA En</option>
    <option>Tamil</option>
    <option>Kanada</option>
    </select></Link>
    </leftTop>
   
    <rightTop>
      <Link to="/MyWishlist" className='links'>My wishList</Link>
      <Link to="/Login" className='links'>Sign In</Link>
      <Link to="/Register" className="links">Reigster</Link>
    <Link to="/Shop" className='links'>Store Locator</Link>
    <Link className='links'>Blog</Link>
    


    </rightTop>
    </div>
        <div className="front2ndBar">
          <div>
            <img src="./LogoImage/Logo.jpg" className="logo"/>
          </div>
        
          <FontAwesomeIcon icon={faSearch} className='frontSearchIcon'/>
            <input type="text" placeholder='search for products' className='frontSearchBox'  onChange={(e) => setShopSearch(e.target.value)}/>
            <Link to={"/CategoryProductListing/?categoryName="+shopSearch}>
             <button className='frontSearchButton' onClick={productSearching}>Search</button>
              </Link>
        <h3 className='Contact_No'>Call 1234 900 XXX</h3>
      
        <button className='cartButton'><Link to="/Cart" className='frontCartlink'>Cart<FontAwesomeIcon icon={faBagShopping} className='cartBag'/></Link></button>
   
          
        </div>
        <div className='front3rdBar'>
<Link className='thirdBarlinks'>New arrivals</Link>
<Link className='thirdBarlinks'>Brands</Link>
<Link className='thirdBarlinks'>Women</Link>
<Link className='thirdBarlinks'>Men</Link>
<Link className='thirdBarlinks'>Girls</Link>
<Link className='thirdBarlinks'>Boys</Link>
<Link className='thirdBarlinks'>Kids</Link>
<Link className='thirdBarlinks'>Sale</Link>
        </div>
        <div>
  
          <Carousel autoPlay infiniteLoop className="OfferCarousel" showThumbs={false}>
          {hotOffers.map((item,index)=>{
            return(
               <img
               src={`http://localhost:3019/${item.File}`}
               id='OfferCarouselImg'
               alt={`Product Image ${index + 1}`}
             />)
          }) }
          </Carousel>
          
       
    
        <div className='front4thBar'>
          <button className='fourthBarButt'>Free Shiping & Returns</button>
          <button className='fourthBarButt'>Loyalty Program</button>
        </div>
        <h4 style={{textAlign:"center",margin:"30px"}}>Categori listing</h4>
        <div className='Product-container' >
              <div className='row'>
                {categoryBunch.map((Bunch) => (
                  <div className='col-3' id="CategoryBunchBox">
                  
                  
                      <div className='CategoryBunchHeader'>
                        {Bunch.Category}
                      </div>
                      <div className='Categorybody'>
                        <div>
                       <Link to={"/CategoryProductListing/?categoryName="+Bunch.Category}>
                          <img src={`http://localhost:3019/${Bunch.Image}`} id="CategoryBunchImgView" />
                          </Link>
                        </div>
                      </div>
                    </div>
                 
              
                ))}
              </div>

        </div>
        <div className='Offers'>

        </div>
        <div className="Featured_Products">
          <h4>High Viewed Products</h4>
        <div className='Product-container' >
      <div className='row'>
        {getImage.map((product) => (
          <div className='col-3' id="box">
          
            <div className='cover' onClick={()=>{
              setImgId(product._id)
            }}>
              <div className='header'>
                {product.Category}
              </div>
              <div className='body'>
                <div>
                <Link to={"/ProductDetail/?ProductId="+product._id} className='ProductLink'>
                  <img src={`http://localhost:3019/${product.Image}`} id="productImgView" />
                  </Link>
                </div>
                <div>Rs.{product.Price}</div>
                
                <div>
                  <button onClick={()=>{
                  addCart(product._id)}}>Add to cart</button>
                  <input
                    type="number"
                    min={1}
                    className='shopQuantity'
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setImgId(product._id);
                    }}
                  />
                 
               
                </div>
              </div>
              <div className='footer'>quick View : {product.Description}</div>
            </div>
          </div>
      
        ))}
      </div>
     
    </div>
        </div>
        <div className='ReferenceBar'>
    <div className='row'>
      <div className='col-2'>About Us
      <ul>
        <li>item one</li>
        <li>item two</li>
        <li>item three</li>
        <li>item three</li>
        </ul></div>
      <div className='col-2'>
        Customer-Care
      <ul>
        <li>item one</li>
        <li>item two</li>
        <li>item three</li>
        <li>item three</li>
        </ul></div>
      <div className='col-2'>
        Contact Us
        <ul>
        <li>item one</li>
        <li>item two</li>
        <li>item three</li>
        <li>item three</li>
        </ul></div>
      <div className='col-6'>
      <div>Subscribe to our Newsletter</div>
    </div>
    </div>

        </div>
    </div>
    </div>
  )
}

export default FrontPage
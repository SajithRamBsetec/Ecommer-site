import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import "./Shop.css"
import ProductDetail from './ProductDetail'

const Shop = () => {
  // Initialization
  const [imgId, setImgId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [getImage, setGetImage] = useState([]);
  const [userId, setUserId] = useState("");
  const [shopSearch, setShopSearch] = useState("");
  const [detailView,setDetailView]=useState(0)

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

  // Setting add cart items
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
  useEffect(()=>{
    setDetailView(0)
  },[])


  return (
    <div>
      <div className='frontTopBar'>
      <Link to="/Profile" className="links">Profile</Link>
        <Link to="/Register" className="links">Register</Link>
        <Link to="/Cart" className="links">Cart</Link>
        <Link to="/AddProducts" className='links'>AddProducts</Link>
        <Link to="/Logout" className='links'>Logout</Link>
        <span className='loginIndicator'>Click Here to</span> <Link to="/Login" className='LoginLink'>Login</Link>
     
      </div>
      <div>
        <input
          type="text"
          className='ShopsearchBox'
          onChange={(e) => setShopSearch(e.target.value)}
        />
        <button onClick={productSearching}>search</button>
      </div>
      <div className='Product-container' >
      <div className='row'>
        {getImage.map((product) => (
          <div className='col-3' id="box">
          
            <div className='cover' onClick={()=>{
              setDetailView(1)
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
  );
}

export default Shop;

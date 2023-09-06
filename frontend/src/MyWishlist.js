import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const MyWishlist = () => {
    const [imgId, setImgId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [getImage, setGetImage] = useState([]);
    const [detailView,setDetailView]=useState(0)

    useEffect(async()=>{
        const user=localStorage.getItem("user_id")
        const response=await axios.get("http://localhost:3019/api/getWishList",{params:{
            userId:user
        }})
        if(response.status==200){
            alert("sucess")
        }
        setGetImage(response.data)
        console.log(response)
    },[])

    const addCart = (imageId) => {
    const userId=localStorage.getItem("user_id")
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
    
  return (
    <div>
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
  )
}

export default MyWishlist

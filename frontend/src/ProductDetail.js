import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import "./ProductDetail.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { faGoogle, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ProductDetail = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const ProductId = queryParams.get("ProductId");

  const navigate = useNavigate()
  const [similarProducts, setSimilarProducts] = useState([])
  const [Item, setItems] = useState([]);
  const [shopSearch, setShopSearch] = useState("")
  const [imgId, setImgId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [detailView, setDetailView] = useState(0)

  const addCart = () => {
    const userId = localStorage.getItem("user_id")
    axios.post("http://localhost:3019/api/addcart", {
      userId: userId,
      productId: ProductId,
      quantity: quantity,
      mode: "add"
    })
      .then((response) => {
        alert(response.data); // Display the response data
      })
      .catch((err) => {
        alert("Unable to send");
      });
  };

  useEffect(() => {

    axios.get("http://localhost:3019/api/ShowCart", { params: { userId: null, ProductId: ProductId } })
      .then((result) => {
        setItems(result.data)
        setShopSearch(result.data[0].Category)
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ProductId])

  useEffect(() => {
    const fetchSimilarProducts = () => {

      axios.get("http://localhost:3019/api/getImage", {
        params: {
          imgsearch: shopSearch,
          mode: "search",
          ProductId: ProductId
        }
      }).then((result) => {
        setSimilarProducts(result.data);
        console.log("result" + result);
        // Call the function to fetch similar products only if shopSearch changes
     

      })
        .catch((error) => {
          console.error("Error searching products:", error);
          alert("An error occurred while searching products.");
        })
    }
    if (shopSearch) {
      fetchSimilarProducts();
    }
  }, [shopSearch]);

  const addWishList = async (image) => {
    const Image = image;
    const user = localStorage.getItem("user_id")
    const result = await axios.get("http://localhost:3019/api/addWishlist", {
      params: {
        ImageId: Image,
        UserId: user
      }
    })

    if (result.status == 200)
      alert("sucessfully added to wishlist")
    else
      alert("there seems an error in Adding Wishlist")

  }
  return (
    <div className='ProductMain'>
      <div className='ProductDetail'>
        {Item.map((product) => (
          <div key={product._id}>
            <div className='detailcover'>
              <div className='row'>
                <div className='col-6'>
                  <Carousel className='carousels' emulateTouch={true} showArrows={true} showThumbs={true}>
                    {product.SpecImages.map((item, index) => (
                      <img
                        src={`http://localhost:3019/${item}`}
                        id='productPreView'
                        alt={`Product Image ${index + 1}`}
                      />
                    ))}
                  </Carousel>
                </div>
                <div className='col-6'>
                  <div className='detailheader'>
                    {product.Category}
                  </div>
                  <review className="reviewStars"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "white" }} icon={faStar} /></review>
                  <div className='ProductPrice'>
                    Rs.{product.Price}
                  </div>
                  <div>
                    <label className='QTYlabel'>QTY</label>
                    <input
                      type='number'
                      min={1}
                      className='ProductQuantity'
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className='ProductVariety'>
                    <h5>Product Variety</h5>
                  </div>
                  <div>
                    <button onClick={addCart} className='ProductAddToCart'>Add to cart</button>
                  </div>
                  <div>
                    <h5 className='productSecure'>shop secure free returns</h5>
                  </div>
                  <div className='row'>
                    <div className='col-3'><h6 className='addWishlist' onClick={() => { addWishList(product._id) }}>Add to wishList</h6></div>
                    <div className='col-3'> <h6 className='addCompare'>Add to compare</h6></div>
                  </div>

                  <div> <span className='shareVia'>Share</span>
                    <span>
                      <FontAwesomeIcon icon={faTwitter} className='shareOptions' />
                      <FontAwesomeIcon icon={faInstagram} className='shareOptions' />
                      <FontAwesomeIcon icon={faWhatsapp} className='shareOptions' /></span></div>


                </div>
              </div>
              <div>
                <bar className="ProductBar">
                  <Tabs>
                    <TabList>
                      <Tab> Description</Tab>
                      <Tab>Reviews</Tab>
                      <Tab>Shipping Address</Tab>
                    </TabList>
                    <TabPanel className='PreviewDescription'>
                      <div >{product.Description}<br />
                        <span className='Specheading'>
                          Specifications
                        </span><br />
                        <ul>

                          {product.Specifications.map((item) => (
                            <li className='Specs'><h5>{item.Key} : </h5><h5>{item.Value}</h5></li>
                          ))}
                        </ul>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      none
                    </TabPanel>
                    <TabPanel>
                      None
                    </TabPanel>
                  </Tabs>
                </bar>
              </div>

            </div>
          </div>
        ))}
      </div>
      <h3 style={{ textAlign: "center" }}>Related Products</h3>
      <div className='Product-container'>
        <div className='row'>
          {similarProducts.map((product) => (
            <div className='col-3' id='RelatedBox' key={product._id}>
              <div className='cover' onClick={()=>{
              setDetailView(1)
              setImgId(product._id)
            }}>
             
              <div className='ProductBody'>
                <div >
                <Link to={"/ProductDetail/?ProductId="+product._id} className='ProductLink'>
                  <img src={`http://localhost:3019/${product.Image}`} id="productImgView" />
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
      <button onClick={() => navigate('/Shop')} className='prevBackButt' style={{ margin: '3%' }}>
        Back to Shop
      </button>
    </div>
  );
};

export default ProductDetail;
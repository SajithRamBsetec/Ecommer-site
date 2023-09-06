import {Routes,Route} from "react-router-dom"
import React from 'react'
import './App.css';
import FrontPage from "./FrontPage";
import Register from "./Register";
import Login from "./Login";
import Shop from "./Shop";
import Cart from "./Cart";
import AddProducts from "./AddProducts";
import Logout from "./Logout";
import Profile from "./Profile"
import PaymentCheck from "./PaymentCheck";
import ProductDetail from "./ProductDetail";
import MyWishlist from "./MyWishlist";
import HotNews from "./HotNews";
import PaymentsForm from "./Paymentsform";
import { BillingAddress } from "./CartComponents";
import CategoryProductListing from "./CategoryProductListing";
import NewAddProductPage from "./NewAddProductPage";
import Administrator from "./Administrator";
import OrderManagement from "./OrderManagement";
import CustomerManagement from "./CustomerManagement";
import StoreManagement from "./StoreManagement";
function App() {
  return (
    <div>
     <Routes>
      <Route path="Administrator" element={<Administrator/>}/>
      <Route path="/FrontPage" element={<FrontPage/>} />
      <Route path="/Profile" element={<Profile/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Shop" element={<Shop/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/AddProducts" element={<AddProducts/>} />
      <Route path="/NewAddProductPage" element={<NewAddProductPage/>} />
      <Route path="/Logout" element={<Logout/>} />
      <Route path="/PaymentForm" element={<PaymentCheck/>}/>
      <Route path="/PaymentsForm" element={<PaymentsForm/>}/>
      <Route path="/ProductDetail" element={<ProductDetail/>}/>
      <Route path="/MyWishlist" element={<MyWishlist/>}/>
      <Route path="/HotNews" element={<HotNews/>}/>
      <Route path="/BillingAddress" element={<BillingAddress/>}/>
      <Route path="/CategoryProductListing" element={<CategoryProductListing/>}/>
      <Route path="/OrderManagement" element={<OrderManagement/>}/>
      <Route path="/CustomerManagement" element={<CustomerManagement/>}/>
      <Route path="/StoreManagement" element={<StoreManagement/>}/>
    </Routes>

    </div>
  );
}

export default App;

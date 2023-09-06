import React,{useEffect, useState} from "react";
import "./Administrator.css";
import AddProducts from "./AddProducts"
import axios from "axios";
import CustomerManagement from "./CustomerManagement";
import OrderManagement from "./OrderManagement";

const Administrator = () => {




  const [OpenWhat,setOpenWhat]=useState("")
  return (
    <div>
      <div className="row">
        <div className="col-2" id="Dashboard">
            <h6>Dashboard</h6><hr/>
        <h6>Store Management</h6><hr/>
        <h6 onClick={()=>{setOpenWhat("CustomerManagement")}}>Customer Management</h6><hr/>
        <h6 onClick={()=>{setOpenWhat("ProductManagement")}}>OrderManagement</h6><hr/>
        <h6 onClick={()=>{setOpenWhat("AddProduct")}}>Add Product</h6><hr/>
        </div>
        <div className="col-10">
        {OpenWhat=="AddProduct" &&<AddProducts/>}
        {OpenWhat=="CustomerManagement" &&<CustomerManagement/>}
        {OpenWhat=="ProductManagement" &&<OrderManagement/>}
        


    
        </div>
      </div>
    </div>
  );
};

export default Administrator;

import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import Delivery from "../../../components/AdminComponents/Delivery/Delivery";
import './DeliveryList.scss';


const DeliveryList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Delivery />
            </div>
        </div>
    )
}

export default DeliveryList;
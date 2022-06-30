import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import OrderDetails from "../../../components/AdminComponents/OrderDetails/OrderDetails";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './orderList.scss';

const OrderList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <OrderDetails />
            </div>
        </div>
    )
}

export default OrderList;
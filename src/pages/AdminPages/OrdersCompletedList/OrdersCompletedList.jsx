import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import OrdersCompleted from "../../../components/AdminComponents/OrdersCompleted/OrdersCompleted";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './ordersCompletedList.scss';

const OrdersCompletedList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <OrdersCompleted />
            </div>
        </div>
    )
}

export default OrdersCompletedList;
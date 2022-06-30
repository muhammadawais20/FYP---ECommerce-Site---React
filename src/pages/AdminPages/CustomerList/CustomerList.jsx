import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import Customers from "../../../components/AdminComponents/Customers/Customers";
import './customerList.scss';

const CustomerList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Customers />
            </div>
        </div>
    )
}

export default CustomerList;
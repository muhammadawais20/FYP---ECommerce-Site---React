import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import ProductTable from "../../../components/AdminComponents/ProductTable/ProductTable";
import './productList.scss';

const ProductList = () => {
    return (
        <div className="listProduct">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <ProductTable />
            </div>
        </div>
    )
}

export default ProductList;
import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './adminList.scss';
import AdminTable from "../../../components/AdminComponents/AdminTable/AdminTable";

const AdminList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <AdminTable />
            </div>
        </div>
    )
}

export default AdminList;
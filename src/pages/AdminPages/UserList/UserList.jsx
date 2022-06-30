import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import UserTable from "../../../components/AdminComponents/UserTable/UserTable";
import './userList.scss';

const UserList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <UserTable />
            </div>
        </div>
    )
}

export default UserList;
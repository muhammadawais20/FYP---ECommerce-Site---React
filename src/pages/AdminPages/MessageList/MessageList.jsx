import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './messageList.scss';
import MessageTable from "../../../components/AdminComponents/MessageTable/MessageTable";

const MessageList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <MessageTable />
            </div>
        </div>
    )
}

export default MessageList;
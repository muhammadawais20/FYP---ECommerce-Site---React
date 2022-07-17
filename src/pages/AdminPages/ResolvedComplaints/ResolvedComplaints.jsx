import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import ResolvedComplaintsTable from "../../../components/AdminComponents/ResolvedComplaintsTable/ResolvedComplaintsTable";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './resolvedComplaints.scss';

const ResolvedComplaints = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <ResolvedComplaintsTable />
            </div>
        </div>
    )
}

export default ResolvedComplaints;
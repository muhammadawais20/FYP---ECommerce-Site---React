import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import ProfitTable from "../../../components/AdminComponents/ProfitTable/ProfitTable";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './profitList.scss';

const ProfitList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <ProfitTable />
            </div>
        </div>
    )
}

export default ProfitList;
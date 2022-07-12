import React from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './blogList.scss';
import BlogTable from "../../../components/BlogTable/BlogTable";

const BlogList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <BlogTable />
            </div>
        </div>
    )
}

export default BlogList;
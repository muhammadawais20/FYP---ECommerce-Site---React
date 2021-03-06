import React from "react";
import BlogTable from "../../../components/AdminComponents/BlogTable/BlogTable";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './blogList.scss';

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